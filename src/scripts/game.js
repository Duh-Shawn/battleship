import getRules from "./rules";
import shipFactory from "./ship";

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

  const hightlightTestComputerShips = (coords) => {
    const selectedBox = document
      .querySelector(".enemy-board")
      .querySelector(`[data-row='${coords.row}'][data-col='${coords.col}']`);
    selectedBox.classList.add("selected-box");
  };

  const areComputerSelectedCoordsUnique = (
    array,
    startingCoords,
    orientation,
    shipLength
  ) => {
    if (orientation === 0) {
      for (
        let i = startingCoords.col;
        i < startingCoords.col + shipLength;
        i += 1
      ) {
        if (array[startingCoords.row][i] !== "empty") return false;
      }
    } else if (orientation === 1) {
      for (
        let i = startingCoords.row;
        i < startingCoords.row + shipLength;
        i += 1
      ) {
        if (array[i][startingCoords.col] !== "empty") return false;
      }
    }
    return true;
  };

  const areComputerSelectedCoordsInbounds = (
    startingCoords,
    orientation,
    shipLength
  ) => {
    if (orientation === 0) {
      if (startingCoords.col + shipLength - 1 > 9) return false;
    } else if (orientation === 1) {
      if (startingCoords.row + shipLength - 1 > 9) return false;
    }
    return true;
  };

  const placeComputerShip = (startingCoords, orientation, ship) => {
    const tmpRow = startingCoords.row;
    const tmpCol = startingCoords.col;
    const shipLength = ship.getLength();

    if (
      areComputerSelectedCoordsInbounds(startingCoords, orientation, shipLength)
    ) {
      // horizontal ship placement
      if (orientation === 0) {
        for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {
          computer.getBoard().placeShip({ row: tmpRow, col: i }, ship);
        }
      }
      // vertical ship placement
      else {
        for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {
          computer.getBoard().placeShip({ row: i, col: tmpCol }, ship);
        }
      }
    }
    // coords have been found to be out of bounds{
    else {
      throw new Error("Ship placement exceeds the allocated board space");
    }
  };

  const placeRandomComputerShips = (size = 10) => {
    const selectedCoordsHistory = [...Array(size)].map(() =>
      Array(size).fill("empty")
    );

    for (let i = 0; i < getRules().ships.length; i += 1) {
      let coords = null;
      const orientation = computer.getRandomIntInclusive(0, 1); // randomly pick horizontal or vertical orientation
      const shipInfo = getRules().ships[i];
      const shipLength = shipInfo.length;
      const ship = shipFactory(shipLength);
      let coordsAreInvalid = true;
      // loop until the computer selects proper coords
      while (coordsAreInvalid) {
        coords = computer.randomCoords();
        // check if computer selected coords are inbounds
        if (
          areComputerSelectedCoordsInbounds(coords, orientation, shipLength)
        ) {
          // check if the computer selected coords already contain a ship
          if (
            areComputerSelectedCoordsUnique(
              selectedCoordsHistory,
              coords,
              orientation,
              shipLength
            )
          ) {
            coordsAreInvalid = false;
          }
        }
      }
      placeComputerShip(coords, orientation, ship);
      selectedCoordsHistory[coords.row][coords.col] = ship;
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
    areComputerSelectedCoordsInbounds,
    areComputerSelectedCoordsUnique,
    placeRandomComputerShips,
  };
};

export default gameFactory;
