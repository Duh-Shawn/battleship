import boardFactory from "./board";
import playerFactory from "./player";
import computerFactory from "./computer";
import shipFactory from "./ship";
import gameFactory from "./game";
import * as DOM from "./dom";
import getRules from "./rules";

const toggleOrientationButton = document.getElementById("toggle-orientation");
const setupBoard = document.querySelector(".friendly-board-setup");
const friendlyBoard = document.querySelector(".friendly-board");
const enemyBoard = document.querySelector(".enemy-board");

const player = playerFactory("Player", boardFactory());
const computer = computerFactory("Computer", boardFactory());
const game = gameFactory(player, computer);
const startingShipCount = getRules().ships.length;
let countShipsPlaced = 0;
let orientation = 0; // 0 is for horizontal, 1 is for vertical

const isInBoundsHorizontally = (coords) => {
  const shipLength = getRules().ships[countShipsPlaced].length;
  return (
    document
      .querySelector(".friendly-board-setup")
      .querySelector(
        `[data-row='${coords.row}'][data-col='${
          coords.col + (shipLength - 1)
        }']`
      ) !== null
  );
};

const isInBoundsVertically = (coords) => {
  const shipLength = getRules().ships[countShipsPlaced].length;
  return (
    document
      .querySelector(".friendly-board-setup")
      .querySelector(
        `[data-row='${coords.row + shipLength - 1}'][data-col='${coords.col}']`
      ) !== null
  );
};

const addHighlighting = (event) => {
  if (countShipsPlaced !== startingShipCount) {
    if (event.target.classList.contains("box")) {
      if (orientation === 0) {
        const tmpRow = Number(event.target.dataset.row);
        const tmpCol = Number(event.target.dataset.col);
        const shipLength = getRules().ships[countShipsPlaced].length;
        if (isInBoundsHorizontally({ row: tmpRow, col: tmpCol })) {
          for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {
            DOM.highlightBox({ row: tmpRow, col: i });
          }
        } else {
          for (let i = tmpCol; i < 10; i += 1) {
            DOM.showOutOfBounds({ row: tmpRow, col: i });
          }
        }
      } else {
        const tmpRow = Number(event.target.dataset.row);
        const tmpCol = Number(event.target.dataset.col);
        const shipLength = getRules().ships[countShipsPlaced].length;
        if (isInBoundsVertically({ row: tmpRow, col: tmpCol }, shipLength)) {
          for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {
            DOM.highlightBox({ row: i, col: tmpCol });
          }
        } else {
          for (let i = tmpRow; i < 10; i += 1) {
            DOM.showOutOfBounds({ row: i, col: tmpCol });
          }
        }
      }
    }
  }
};

const removeHighlighting = (event) => {
  if (countShipsPlaced !== startingShipCount) {
    if (event.target.classList.contains("box")) {
      if (orientation === 0) {
        const tmpRow = Number(event.target.dataset.row);
        const tmpCol = Number(event.target.dataset.col);
        const shipLength = getRules().ships[countShipsPlaced].length;
        if (isInBoundsHorizontally({ row: tmpRow, col: tmpCol }, shipLength)) {
          for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {
            DOM.removeBoxHighlight({ row: tmpRow, col: i });
          }
        } else {
          for (let i = tmpCol; i < 10; i += 1) {
            DOM.removeOutOfBounds({ row: tmpRow, col: i });
          }
        }
      } else {
        const tmpRow = Number(event.target.dataset.row);
        const tmpCol = Number(event.target.dataset.col);
        const shipLength = getRules().ships[countShipsPlaced].length;
        if (isInBoundsVertically({ row: tmpRow, col: tmpCol }, shipLength)) {
          for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {
            DOM.removeBoxHighlight({ row: i, col: tmpCol });
          }
        } else {
          for (let i = tmpRow; i < 10; i += 1) {
            DOM.removeOutOfBounds({ row: i, col: tmpCol });
          }
        }
      }
    }
  }
};

const initHighlighting = () => {
  setupBoard.addEventListener("mouseover", addHighlighting);
  setupBoard.addEventListener("mouseout", removeHighlighting);
};

const startGame = () => {
  DOM.initGameBoards(10); // setup the boards with blocks in 10 x 10 configuration
  DOM.renderFriendlyBoard(player.getBoard());
  DOM.renderEnemyBoard(computer.getBoard());
  enemyBoard.addEventListener("click", (event) => {
    if (!game.isGameOver()) {
      // check that a box has been clicked
      if (event.target.classList.contains("box")) {
        // box in the enemy board has been selected
        if (event.target.parentNode.classList.contains("enemy-board")) {
          // Player Turn
          const { row, col } = event.target.dataset; // grab row and col values from html data attribute
          game.playTurn({ row, col }); // play turn for human player
          DOM.renderEnemyBoard(computer.getBoard()); // render human player's attack on computers board
          if (game.isGameOver()) {
            console.log(game.getWinner().getName());
          } else {
            // Allow Computer to take a turn
            game.playComputerTurn();
            DOM.renderFriendlyBoard(player.getBoard()); // render computer's attack on human player's board
            if (game.isGameOver()) {
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
  initHighlighting();

  const handleSetupBoardPlaceShip = (event) => {
    if (countShipsPlaced !== startingShipCount) {
      // check that a box has been clicked
      if (event.target.classList.contains("box")) {
        const shipLength = getRules().ships[countShipsPlaced].length;
        // horizontal orientation has been selected
        if (orientation === 0) {
          const tmpRow = Number(event.target.dataset.row);
          const tmpCol = Number(event.target.dataset.col);

          // selected coords are in bounds
          if (isInBoundsHorizontally({ row: tmpRow, col: tmpCol })) {
            for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {
              DOM.selectBox({ row: tmpRow, col: i });
            }
            game.placePlayerShip(
              { row: tmpRow, col: tmpCol },
              orientation,
              shipFactory(shipLength)
            );
            countShipsPlaced += 1;
          }
        }
        // vertical orientation has been selected
        else {
          const tmpRow = Number(event.target.dataset.row);
          const tmpCol = Number(event.target.dataset.col);
          if (isInBoundsVertically({ row: tmpRow, col: tmpCol }, shipLength)) {
            for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {
              DOM.selectBox({ row: i, col: tmpCol });
            }
            game.placePlayerShip(
              { row: tmpRow, col: tmpCol },
              orientation,
              shipFactory(shipLength)
            );
            countShipsPlaced += 1;
          }
        }
      }
    } else {
      // startGame();
    }
  };

  const handleOrientationToggle = (event) => {
    const orientationButton = event.target;
    if (orientationButton.textContent === "Horizontal") {
      orientationButton.textContent = "Vertical";
      orientation = 1;
      initHighlighting();
    } else {
      orientationButton.textContent = "Horizontal";
      orientation = 0;
      initHighlighting();
    }
  };

  setupBoard.addEventListener("click", handleSetupBoardPlaceShip);
  toggleOrientationButton.addEventListener("click", handleOrientationToggle);
};

setup();
