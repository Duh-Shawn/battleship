import boardFactory from "./board";
import playerFactory from "./player";
import computerFactory from "./computer";
import shipFactory from "./ship";
import gameFactory from "./game";
import * as DOM from "./dom";
import getRules from "./rules";

const setupBoard = document.querySelector(".friendly-board-setup");

const player = playerFactory("Player", boardFactory());
const computer = computerFactory("Computer", boardFactory());
const game = gameFactory(player, computer);
const startingShipCount = getRules().ships.length;
let countShipsPlaced = 0;

const startGame = () => {
  DOM.initGameBoards(10); // setup the boards with blocks in 10 x 10 configuration
  DOM.renderFriendlyBoard(player.getBoard());
  DOM.renderEnemyBoard(computer.getBoard());
  game.placeRandomComputerShips();
  const enemyBoard = document.querySelector(".enemy-board");
  enemyBoard.addEventListener("click", (event) => {
    if (!game.isGameOver()) {
      // check that a box has been clicked
      if (event.target.classList.contains("box")) {
        // box in the enemy board has been selected
        if (
          event.target.parentNode.classList.contains("enemy-board") &&
          !event.target.classList.contains("hit-shot") &&
          !event.target.classList.contains("missed-shot")
        ) {
          // Player Turn
          const { row, col } = event.target.dataset; // grab row and col values from html data attribute
          game.playTurn({ row, col }); // play turn for human player
          DOM.renderEnemyBoard(computer.getBoard()); // render human player's attack on computers board
          if (game.isGameOver()) {
            game.getWinner().getName();
            console.log(game.getWinner().getName());
          } else {
            // Allow Computer to take a turn
            game.playComputerTurn();
            DOM.renderFriendlyBoard(player.getBoard()); // render computer's attack on human player's board
            if (game.isGameOver()) {
              game.getWinner().getName();
              console.log(game.getWinner().getName());
            }
          }
        }
      }
    }
  });
};

const setup = () => {
  // BEGIN SETUP
  DOM.hideGameBoards();
  DOM.displaySetupBoard(10);
  DOM.initHighlighting();

  const handleSetupBoardPlaceShip = (event) => {
    if (countShipsPlaced !== startingShipCount) {
      // check that a box has been clicked
      if (event.target.classList.contains("box")) {
        const tmpRow = Number(event.target.dataset.row);
        const tmpCol = Number(event.target.dataset.col);
        const shipLength = getRules().ships[countShipsPlaced].length;
        const toggleOrientationButton =
          document.getElementById("toggle-orientation");
        const orientation =
          toggleOrientationButton.textContent === "Horizontal" ? 0 : 1; // 0 is for horizontal, 1 is for vertical
        // horizontal orientation has been selected
        if (orientation === 0) {
          // selected coords are in bounds
          if (DOM.isInBoundsHorizontally({ row: tmpRow, col: tmpCol })) {
            if (
              !DOM.hasShipAlreadyBeenPlacedInPath({ row: tmpRow, col: tmpCol })
            ) {
              for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {
                DOM.selectBox({ row: tmpRow, col: i });
              }
              game.placePlayerShip(
                { row: tmpRow, col: tmpCol },
                orientation,
                shipFactory(shipLength)
              );
              countShipsPlaced += 1;
              DOM.incrementShipCount();
            }
          }
        }
        // vertical orientation has been selected
        else if (orientation === 1) {
          if (
            DOM.isInBoundsVertically({ row: tmpRow, col: tmpCol }, shipLength)
          ) {
            if (
              !DOM.hasShipAlreadyBeenPlacedInPath({ row: tmpRow, col: tmpCol })
            ) {
              for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {
                DOM.selectBox({ row: i, col: tmpCol });
              }
              game.placePlayerShip(
                { row: tmpRow, col: tmpCol },
                orientation,
                shipFactory(shipLength)
              );
              countShipsPlaced += 1;
              DOM.incrementShipCount();
            }
          }
        }
      }
    } else {
      DOM.hideSetup();
      DOM.showGameBoards();
      startGame();
    }
  };

  setupBoard.addEventListener("click", handleSetupBoardPlaceShip);
};

setup();
