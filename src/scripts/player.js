const playerFactory = (name, gameBoard) => {
  const getName = () => name;

  const getBoard = () => gameBoard;

  return { getName, getBoard };
};

export default playerFactory;
