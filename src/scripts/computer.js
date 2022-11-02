import playerFactory from "./player";

const computerFactory = (name = "Computer", gameBoard = null) => {
  const newComputer = Object.create(playerFactory(name, gameBoard));

  newComputer.attackList = [];

  newComputer.getRandomIntInclusive = (min, max) => {
    const minVal = Math.ceil(min);
    const maxVal = Math.floor(max);
    return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal); // The maximum is inclusive and the minimum is inclusive};
  };

  newComputer.randomCoords = () => {
    const row = newComputer.getRandomIntInclusive(0, 9);
    const col = newComputer.getRandomIntInclusive(0, 9);
    return { row, col };
  };

  newComputer.hasAttackedCoords = (coords) => {
    if (
      newComputer.attackList.find(
        (e) => e.row === coords.row && e.col === coords.col
      )
    ) {
      return true; // coords have been found in attack list
    }

    return false; // coords are unique
  };

  newComputer.recordAttack = (coords) => newComputer.attackList.push(coords);

  newComputer.getAttackList = () => newComputer.attackList;

  newComputer.getNewAttackCoords = () => {
    let uniqueCoords = false;
    let coords = null;
    while (!uniqueCoords) {
      coords = newComputer.randomCoords(); // pick some random coords
      // Only uses these coords if they have not been selected before
      if (newComputer.hasAttackedCoords(coords)) {
        uniqueCoords = false;
      } else {
        uniqueCoords = true;
      }
    }
    return coords;
  };

  return Object.freeze(newComputer);
};

export default computerFactory;
