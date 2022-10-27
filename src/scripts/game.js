const gameFactory = (player, computer) => {
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
        throw new Error("Unable to determine game status - a player is using an empty gameboard");
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

  return { playTurn, playComputerTurn, isGameOver, getWinner };
};

export default gameFactory;
