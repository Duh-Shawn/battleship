import boardFactory from "./board";
import playerFactory from "./player";
import computerFactory from "./computer";
import shipFactory from "./ship";
import gameFactory from "./game";
import * as DOM from "./dom";

const main = () => {
  const enemyBoard = document.querySelector(".enemy-board");

  const player = playerFactory("Player", boardFactory());
  const playerShip3 = shipFactory(1);
  player.getBoard().placeShip({ row: 9, col: 1 }, playerShip3);

  const computer = computerFactory("Computer", boardFactory());
  const computerShip1 = shipFactory(1);
  computer.getBoard().placeShip({ row: 9, col: 1 }, computerShip1);

  const game = gameFactory(player, computer);

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

main();
