// factory function for creating gameboards
const boardFactory = (size = 10) => {
  const board = [...Array(size)].map(() => Array(size).fill("empty"));

  const hits = [];

  const misses = [];

  const ships = [];

  const getHits = () => hits;

  const getMisses = () => misses;

  const placeShip = (coords, ship) => {
    board[coords.row][coords.col] = ship;
    ships.push(ship);
  };

  const spotContainsShip = (coords) =>
    board[coords.row][coords.col] !== "empty";

  const receiveAttack = (coords) => {
    if (spotContainsShip(coords)) {
      const ship = board[coords.row][coords.col];
      ship.hit();
      hits.push(coords);
    } else {
      misses.push(coords);
    }
  };

  const areAllShipsSunk = () => {
    // check if ships array is empty
    if (ships.length === 0) {
      throw new Error("There are no ships on the gameboard!");
    }
    for (let i = 0; i < ships.length; i += 1) {
      const ship = ships[i];
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  return { placeShip, receiveAttack, getHits, getMisses, areAllShipsSunk };
};

export default boardFactory;
