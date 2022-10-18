// factory function for creating gameboards
const boardFactory = () => {
  const board = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  const misses = [];

  const ships = [];

  const getBoard = () => board;

  const getMisses = () => misses;

  const placeShip = (row, col, ship) => {
    board[row][col] = ship;
    ships.push(ship);
  };

  const spotContainsShip = (row, col) => board[row][col] !== null;

  const receiveAttack = (row, col) => {
    if (spotContainsShip(row, col)) {
      const ship = board[row][col];
      ship.hit();
    } else {
      misses.push({ row, col });
    }
  };

  const areAllShipsSunk = () => {
    for (let i = 0; i < ships.length; i += 1) {
      const ship = ships[i];
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  return { getBoard, placeShip, receiveAttack, getMisses, areAllShipsSunk };
};

export default boardFactory;
