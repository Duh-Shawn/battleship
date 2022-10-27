import shipFactory from "../scripts/ship";
import boardFactory from "../scripts/board";

test("receives a attack that hit", () => {
  const ship = shipFactory(4);
  const gameBoard = boardFactory();
  gameBoard.placeShip({ row: 3, col: 3 }, ship);
  gameBoard.placeShip({ row: 3, col: 4 }, ship);
  gameBoard.placeShip({ row: 3, col: 5 }, ship);
  gameBoard.placeShip({ row: 3, col: 6 }, ship);
  gameBoard.receiveAttack({ row: 3, col: 3 });
  gameBoard.receiveAttack({ row: 3, col: 4 });

  expect(ship.getHits()).toBe(2);
  expect(gameBoard.getHits()[0]).toEqual({ row: 3, col: 3 });
  expect(gameBoard.getHits()[1]).toEqual({ row: 3, col: 4 });
});

test("receives a attack that missed", () => {
  const gameBoard = boardFactory();
  gameBoard.receiveAttack({ row: 3, col: 3 });
  const missesCopy = gameBoard.getMisses();

  expect(missesCopy[0]).toEqual({ row: 3, col: 3 });
});

test("throws exception when ship list is empty and checking if all ships are sunk", () => {
  const gameBoard = boardFactory();
  expect(() => gameBoard.areAllShipsSunk()).toThrow("There are no ships on the gameboard!");
});

test("all ships have been sunk", () => {
  const ship = shipFactory(4);
  const gameBoard = boardFactory();
  gameBoard.placeShip({ row: 3, col: 3 }, ship);
  gameBoard.placeShip({ row: 3, col: 4 }, ship);
  gameBoard.placeShip({ row: 3, col: 5 }, ship);
  gameBoard.placeShip({ row: 3, col: 6 }, ship);
  gameBoard.receiveAttack({ row: 3, col: 3 });
  gameBoard.receiveAttack({ row: 3, col: 4 });
  gameBoard.receiveAttack({ row: 3, col: 5 });
  gameBoard.receiveAttack({ row: 3, col: 6 });

  expect(gameBoard.areAllShipsSunk()).toBe(true);
});

test("all ships have NOT been sunk", () => {
  const ship = shipFactory(4);
  const gameBoard = boardFactory();
  gameBoard.placeShip({ row: 3, col: 3 }, ship);
  gameBoard.placeShip({ row: 3, col: 4 }, ship);
  gameBoard.placeShip({ row: 3, col: 5 }, ship);
  gameBoard.placeShip({ row: 3, col: 6 }, ship);

  expect(gameBoard.areAllShipsSunk()).toBe(false);
});
