const playerFactory = (name = "Player", gameBoard = null) => {
  const getName = () => name;

  const getBoard = () => gameBoard;

  return { getName, getBoard };
};

export default playerFactory;
