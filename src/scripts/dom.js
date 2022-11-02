const friendlyBoard = document.querySelector(".friendly-board");
const enemyBoard = document.querySelector(".enemy-board");
const setupBoard = document.querySelector(".friendly-board-setup");
const symbolForMiss = "X";
const symbolForHit = "*";

const hideGameBoards = () => {
  document.querySelector(".game-boards").style.display = "none";
};

const selectBox = (coords) => {
  const selectedBox = setupBoard.querySelector(
    `[data-row='${coords.row}'][data-col='${coords.col}']`
  );
  selectedBox.classList.add("selected-box");
};

const highlightBox = (coords) => {
  const selectedBox = setupBoard.querySelector(
    `[data-row='${coords.row}'][data-col='${coords.col}']`
  );
  selectedBox.classList.add("highlighted-box");
};

const removeBoxHighlight = (coords) => {
  const selectedBox = setupBoard.querySelector(
    `[data-row='${coords.row}'][data-col='${coords.col}']`
  );
  selectedBox.classList.remove("highlighted-box");
};

const showOutOfBounds = (coords) => {
  const selectedBox = setupBoard.querySelector(
    `[data-row='${coords.row}'][data-col='${coords.col}']`
  );
  selectedBox.classList.add("out-of-bounds");
};

const removeOutOfBounds = (coords) => {
  const selectedBox = setupBoard.querySelector(
    `[data-row='${coords.row}'][data-col='${coords.col}']`
  );
  selectedBox.classList.remove("out-of-bounds");
};

const addBoxesToBoard = (size, board) => {
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const box = document.createElement("div");
      box.classList = "box";
      box.dataset.row = i;
      box.dataset.col = j;

      board.appendChild(box);
    }
  }
};

const displaySetupBoard = (size = 10) => {
  addBoxesToBoard(size, setupBoard);
};

const initGameBoards = (size = 10) => {
  // create game boards with a size x size configuartion
  // example: input of 10 will create a 100 box board in a 10 x 10 configuration
  addBoxesToBoard(size, friendlyBoard);
  addBoxesToBoard(size, enemyBoard);
};

const renderMisses = (arry, domBoard) => {
  arry.forEach((el) => {
    const box = domBoard.querySelectorAll(`[data-row='${el.row}']`)[el.col]; // associate the coord obj's row and col with the data-row and col values present on the dom
    box.textContent = symbolForMiss;
  });
};

const renderHits = (arry, domBoard) => {
  arry.forEach((el) => {
    const box = domBoard.querySelectorAll(`[data-row='${el.row}']`)[el.col]; // associate the coord obj's row and col with the data-row and col values present on the dom
    box.textContent = symbolForHit;
  });
};

const renderFriendlyBoard = (board) => {
  renderMisses(board.getMisses(), friendlyBoard);
  renderHits(board.getHits(), friendlyBoard);
};

const renderEnemyBoard = (board) => {
  renderMisses(board.getMisses(), enemyBoard);
  renderHits(board.getHits(), enemyBoard);
};

export {
  displaySetupBoard,
  initGameBoards,
  renderFriendlyBoard,
  renderEnemyBoard,
  hideGameBoards,
  selectBox,
  highlightBox,
  removeBoxHighlight,
  removeOutOfBounds,
  showOutOfBounds,
};
