import shipFactory from "../scripts/ship";
import boardFactory from "../scripts/board";

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
  expect(gameBoard.getHits()[0]).toEqual({ row: 3, col: 3 });
  expect(gameBoard.getHits()[1]).toEqual({ row: 3, col: 4 });
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
