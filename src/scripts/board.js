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

  const getBoard = () => board;

  const getMisses = () => misses;

  const placeShip = (row, col, ship) => {
    board[row][col] = ship;
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
    for (let i = 0; i < board.length; i += 1) {
      for (let j = 0; j < board[i].length; j += 1) {
        if (spotContainsShip(i, j)) {
          const ship = board[i][j];
          if (!ship.isSunk()) return false;
        }
      }
    }
    return true;
  };

  return { getBoard, placeShip, receiveAttack, getMisses, areAllShipsSunk };
};

export default boardFactory;
