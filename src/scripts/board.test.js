import shipFactory from "./ship";
import boardFactory from "./board";

test("places a ship", () => {
  const ship = shipFactory(4);
  const gameBoard = boardFactory();
  gameBoard.placeShip(3, 3, ship);
  gameBoard.placeShip(3, 4, ship);
  gameBoard.placeShip(3, 5, ship);
  gameBoard.placeShip(3, 6, ship);
  const gameBoardCopy = gameBoard.getBoard();
  expect(gameBoardCopy[3][3]).toBe(ship);
  expect(gameBoardCopy[3][4]).toBe(ship);
  expect(gameBoardCopy[3][5]).toBe(ship);
  expect(gameBoardCopy[3][6]).toBe(ship);
});

test("receives a attack that hit", () => {
  const ship = shipFactory(4);
  const gameBoard = boardFactory();
  gameBoard.placeShip(3, 3, ship);
  gameBoard.placeShip(3, 4, ship);
  gameBoard.placeShip(3, 5, ship);
  gameBoard.placeShip(3, 6, ship);
  gameBoard.receiveAttack(3, 3);
  gameBoard.receiveAttack(3, 4);
  expect(ship.getHits()).toBe(2);
});

test("receives a attack that missed", () => {
  const gameBoard = boardFactory();
  gameBoard.receiveAttack(3, 3);
  const missesCopy = gameBoard.getMisses();
  expect(missesCopy[0]).toEqual({ row: 3, col: 3 });
});

test("all ships have been sunk", () => {
  const ship = shipFactory(4);
  const gameBoard = boardFactory();
  gameBoard.placeShip(3, 3, ship);
  gameBoard.placeShip(3, 4, ship);
  gameBoard.placeShip(3, 5, ship);
  gameBoard.placeShip(3, 6, ship);
  gameBoard.receiveAttack(3, 3);
  gameBoard.receiveAttack(3, 4);
  gameBoard.receiveAttack(3, 5);
  gameBoard.receiveAttack(3, 6);
  expect(gameBoard.areAllShipsSunk()).toBe(true);
});

test("all ships have NOT been sunk", () => {
  const ship = shipFactory(4);
  const gameBoard = boardFactory();
  gameBoard.placeShip(3, 3, ship);
  gameBoard.placeShip(3, 4, ship);
  gameBoard.placeShip(3, 5, ship);
  gameBoard.placeShip(3, 6, ship);
  expect(gameBoard.areAllShipsSunk()).toBe(false);
});
