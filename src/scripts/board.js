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

  const hits = [];

  const misses = [];

  const ships = [];

  const getHits = () => hits;

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
      hits.push({ row, col });
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

  return { placeShip, receiveAttack, getHits, getMisses, areAllShipsSunk };
};

export default boardFactory;
