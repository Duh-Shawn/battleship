import boardFactory from "./board";
import playerFactory from "./player";
import computerFactory from "./computer";
import shipFactory from "./ship";
import * as DOM from "./dom";

const main = () => {
  const playerBoard = boardFactory();
  const playerShip1 = shipFactory(3);
  playerBoard.placeShip(5, 5, playerShip1);
  playerBoard.placeShip(5, 6, playerShip1);
  playerBoard.placeShip(5, 7, playerShip1);
  const playerShip2 = shipFactory(1);
  playerBoard.placeShip(2, 3, playerShip2);
  const playerShip3 = shipFactory(1);
  playerBoard.placeShip(9, 1, playerShip3);
  const player = playerFactory("Player", playerBoard);
  playerBoard.receiveAttack(3, 4);
  playerBoard.receiveAttack(5, 5);
  playerBoard.receiveAttack(5, 6);

  const computerBoard = boardFactory();
  const computerShip1 = shipFactory(3);
  computerBoard.placeShip(5, 5, computerShip1);
  computerBoard.placeShip(5, 6, computerShip1);
  computerBoard.placeShip(5, 7, computerShip1);
  const computerShip2 = shipFactory(1);
  computerBoard.placeShip(2, 3, computerShip2);
  const computerShip3 = shipFactory(1);
  computerBoard.placeShip(9, 1, computerShip3);
  const computer = computerFactory("Computer", computerBoard);
  computerBoard.receiveAttack(3, 4);
  computerBoard.receiveAttack(5, 5);
  computerBoard.receiveAttack(9, 1);
  computerBoard.receiveAttack(9, 2);

  // setup the boards with blocks in 10 x 10 configuration
  DOM.initGameBoards(10);
  DOM.renderFriendlyBoard(player.getBoard());
  DOM.renderEnemyBoard(computer.getBoard());

  let gameOver = false;
  let playerTurn = player;
  // while (!gameOver) {
  //   //do stuff

  //   if (player.playerBoard.areAllShipsSunk) {
  //     console.log(`${player.getName()}'s ships have been sunk. ${computer.getName()} wins!`);
  //     gameOver = true;
  //   }
  //   if (computer.playerBoard.areAllShipsSunk) {
  //     console.log(`${computer.getName()}'s ships have been sunk. ${player.getName()} wins!`);
  //     gameOver = true;
  //   }
  // }
};

main();
