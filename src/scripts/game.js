const gameFactory = (player, computer) => {
  const placePlayerShip = (startingCoords, orientation, ship) => {
    const tmpRow = startingCoords.row;
    const tmpCol = startingCoords.col;
    const shipSize = ship.getLength();
    // horizontal ship placement
    if (orientation === 0) {
      if (tmpCol + ship.getLength() - 1 > 9) {
        throw new Error("Ship placement exceeds the allocated board space");
      }
      for (let i = tmpCol; i < tmpCol + shipSize; i += 1) {
        player.getBoard().placeShip({ row: tmpRow, col: i }, ship);
      }
    }
    // vertical ship placement
    else {
      if (tmpRow + ship.getLength() - 1 > 9) {
        throw new Error("Ship placement exceeds the allocated board space");
      }
      for (let i = tmpRow; i < tmpRow + shipSize; i += 1) {
        player.getBoard().placeShip({ row: i, col: tmpCol }, ship);
      }
    }
  };

  const placeComputerShip = (startingCoords, orientation, ship) => {
    const tmpRow = startingCoords.row;
    const tmpCol = startingCoords.col;
    const shipSize = ship.getLength();
    // horizontal ship placement
    if (orientation === 0) {
      if (tmpCol + ship.getLength() - 1 > 9) {
        throw new Error("Ship placement exceeds the allocated board space");
      }
      for (let i = tmpCol; i < tmpCol + shipSize; i += 1) {
        computer.getBoard().placeShip({ row: tmpRow, col: i }, ship);
      }
    }
    // vertical ship placement
    else {
      if (tmpRow + ship.getLength() - 1 > 9) {
        throw new Error("Ship placement exceeds the allocated board space");
      }
      for (let i = tmpRow; i < tmpRow + shipSize; i += 1) {
        computer.getBoard().placeShip({ row: i, col: tmpCol }, ship);
      }
    }
  };

  const playTurn = (coords) => {
    computer.getBoard().receiveAttack(coords);
  };

  const playComputerTurn = () => {
    const computerAttackCoords = computer.getNewAttackCoords(); // computer fetches unused attack coords
    player.getBoard().receiveAttack(computerAttackCoords); // computer attacks playerBoard
    computer.recordAttack(computerAttackCoords); // computer adds the previously used attacks coords to its attack history
  };

  const isGameOver = () => {
    try {
      const playerHasBeenSunk = player.getBoard().areAllShipsSunk();
      const computerHasBeenSunk = computer.getBoard().areAllShipsSunk();
      if (playerHasBeenSunk || computerHasBeenSunk) {
        return true;
      }
      return false;
    } catch (error) {
      if (error.message === "There are no ships on the gameboard!")
        throw new Error(
          "Unable to determine game status - a player is using an empty gameboard"
        );
      else {
        return error;
      }
    }
  };

  const getWinner = () => {
    const playerHasBeenSunk = player.getBoard().areAllShipsSunk();
    const computerHasBeenSunk = computer.getBoard().areAllShipsSunk();
    let winner = null;
    if (!playerHasBeenSunk && computerHasBeenSunk) {
      winner = player;
    } else if (!computerHasBeenSunk && playerHasBeenSunk) {
      winner = computer;
    }
    return winner;
  };

  return {
    playTurn,
    playComputerTurn,
    isGameOver,
    getWinner,
    placePlayerShip,
    placeComputerShip,
  };
};

export default gameFactory;
