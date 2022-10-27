const friendlyBoard = document.querySelector(".friendly-board");
const enemyBoard = document.querySelector(".enemy-board");
const symbolForMiss = "X";
const symbolForHit = "*";

const initGameBoards = (size) => {
  // create game boards with a size x size configuartion
  // example: input of 10 will create a 100 box board in a 10 x 10 configuration
  for (let i = 0; i < size; i += 1) {
    for (let j = 0; j < size; j += 1) {
      const box = document.createElement("div");
      box.classList = "box";
      box.dataset.row = i;
      box.dataset.col = j;
      const box2 = box.cloneNode(true); // create a clone so we can init blocks to friendlyBoard and enemyBoard at the same time

      friendlyBoard.appendChild(box);
      enemyBoard.appendChild(box2);
    }
  }
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

export { initGameBoards, renderFriendlyBoard, renderEnemyBoard };
