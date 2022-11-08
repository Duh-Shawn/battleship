import getRules from "./rules";

const welcome = document.querySelector(".welcome");

const setupBoard = document.querySelector(".friendly-board-setup");
const setupDiv = document.querySelector(".setup");
const gameBoardsDiv = document.querySelector(".game-boards");
const toggleOrientationButton = document.getElementById("toggle-orientation");

const shipsPlaced = document.getElementById("ships-placed");
const startingShipCountDisplay = document.getElementById("starting-ships");
const startingShipCountRule = getRules().ships.length;
startingShipCountDisplay.textContent = startingShipCountRule;

const winnerModal = document.querySelector(".modal");
const winnerModalContent = document.querySelector(".modal-content .winner");
const symbolForMiss = "X";
const symbolForHit = "*";

let friendlyBoard;
let enemyBoard;
let orientation = 0;

const hideWelcome = () => {
  welcome.style.display = "none";
};

const showWinnerModal = (name) => {
  winnerModal.style.display = "flex";
  winnerModalContent.textContent = `${name} WINS!`;
};

const hideWinnerModal = () => {
  winnerModal.style.display = "none";
};

const incrementShipCount = () => {
  shipsPlaced.textContent = Number(shipsPlaced.textContent) + 1;
};

const showSetup = () => {
  setupDiv.style.display = "block";
};

const hideSetup = () => {
  setupDiv.style.display = "none";
};

const resetSetup = () => {
  shipsPlaced.textContent = 0;
  setupBoard.innerHTML = "";
};

const resetGameBoards = () => {
  gameBoardsDiv.innerHTML = "";
};

const showGameBoards = () => {
  gameBoardsDiv.style.display = "flex";
};

const hideGameBoards = () => {
  gameBoardsDiv.style.display = "none";
};

const boxIsAlreadySelected = (coords) => {
  const selectedBox = setupBoard.querySelector(
    `[data-row='${coords.row}'][data-col='${coords.col}']`
  );
  return selectedBox.classList.contains("selected-box");
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

const createFriendlyBoard = () => {
  const tempFriendlyBoard = setupBoard.cloneNode(true);
  tempFriendlyBoard.classList.remove("friendly-board-setup");
  tempFriendlyBoard.classList.add("friendly-board");
  return tempFriendlyBoard;
};

const createEnemyBoard = () => {
  const tempEnemyBoard = document.createElement("div");
  tempEnemyBoard.classList.add("enemy-board");
  tempEnemyBoard.classList.add("board");
  return tempEnemyBoard;
};

const initGameBoards = (size = 10) => {
  // create game boards with a size x size configuartion
  // example: input of 10 will create a 100 box board in a 10 x 10 configuration
  friendlyBoard = createFriendlyBoard();
  enemyBoard = createEnemyBoard();
  gameBoardsDiv.appendChild(friendlyBoard);
  gameBoardsDiv.appendChild(enemyBoard);
  addBoxesToBoard(size, enemyBoard);
};

const renderMisses = (arry, domBoard) => {
  arry.forEach((el) => {
    const box = domBoard.querySelectorAll(`[data-row='${el.row}']`)[el.col]; // associate the coord obj's row and col with the data-row and col values present on the dom
    box.textContent = symbolForMiss;
    box.classList.add("missed-shot");
  });
};

const renderHits = (arry, domBoard) => {
  arry.forEach((el) => {
    const box = domBoard.querySelectorAll(`[data-row='${el.row}']`)[el.col]; // associate the coord obj's row and col with the data-row and col values present on the dom
    box.textContent = symbolForHit;
    box.classList.add("hit-shot");
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

const hasShipAlreadyBeenPlacedInPath = (startingCoords) => {
  const tmpRow = startingCoords.row;
  const tmpCol = startingCoords.col;
  const countShipsPlaced = Number(shipsPlaced.textContent);
  const shipLength = getRules().ships[countShipsPlaced].length;
  // horizontal ship placement
  if (orientation === 0) {
    for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {
      if (boxIsAlreadySelected({ row: tmpRow, col: i })) {
        return true;
      }
    }
  }
  // vertical ship placement
  else {
    for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {
      if (boxIsAlreadySelected({ row: i, col: tmpCol })) {
        return true;
      }
    }
  }
  return false;
};

const isInBoundsHorizontally = (coords) => {
  const countShipsPlaced = Number(shipsPlaced.textContent);
  const shipLength = getRules().ships[countShipsPlaced].length;
  return (
    document
      .querySelector(".friendly-board-setup")
      .querySelector(
        `[data-row='${coords.row}'][data-col='${
          coords.col + (shipLength - 1)
        }']`
      ) !== null
  );
};

const isInBoundsVertically = (coords) => {
  const countShipsPlaced = Number(shipsPlaced.textContent);
  const shipLength = getRules().ships[countShipsPlaced].length;
  return (
    document
      .querySelector(".friendly-board-setup")
      .querySelector(
        `[data-row='${coords.row + shipLength - 1}'][data-col='${coords.col}']`
      ) !== null
  );
};

const addHighlighting = (event) => {
  Number(shipsPlaced.textContent);
  const countShipsPlaced = Number(shipsPlaced.textContent);
  if (countShipsPlaced !== startingShipCountRule) {
    if (event.target.classList.contains("box")) {
      const tmpRow = Number(event.target.dataset.row);
      const tmpCol = Number(event.target.dataset.col);
      const shipLength = getRules().ships[countShipsPlaced].length;
      if (orientation === 0) {
        if (isInBoundsHorizontally({ row: tmpRow, col: tmpCol })) {
          for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {
            if (boxIsAlreadySelected({ row: tmpRow, col: i })) {
              showOutOfBounds({ row: tmpRow, col: i });
            } else {
              highlightBox({ row: tmpRow, col: i });
            }
          }
        } else {
          for (let i = tmpCol; i < 10; i += 1) {
            showOutOfBounds({ row: tmpRow, col: i });
          }
        }
      }
      // vertical orientation has been selected
      else if (orientation === 1) {
        if (isInBoundsVertically({ row: tmpRow, col: tmpCol }, shipLength)) {
          for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {
            if (boxIsAlreadySelected({ row: i, col: tmpCol })) {
              showOutOfBounds({ row: i, col: tmpCol });
            } else {
              highlightBox({ row: i, col: tmpCol });
            }
          }
        } else {
          for (let i = tmpRow; i < 10; i += 1) {
            showOutOfBounds({ row: i, col: tmpCol });
          }
        }
      }
    }
  }
};

const removeHighlighting = (event) => {
  const countShipsPlaced = Number(shipsPlaced.textContent);
  if (countShipsPlaced !== startingShipCountRule) {
    if (event.target.classList.contains("box")) {
      const tmpRow = Number(event.target.dataset.row);
      const tmpCol = Number(event.target.dataset.col);
      const shipLength = getRules().ships[countShipsPlaced].length;
      if (orientation === 0) {
        if (isInBoundsHorizontally({ row: tmpRow, col: tmpCol }, shipLength)) {
          for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {
            removeBoxHighlight({ row: tmpRow, col: i });
            removeOutOfBounds({ row: tmpRow, col: i });
          }
        } else {
          for (let i = tmpCol; i < 10; i += 1) {
            removeOutOfBounds({ row: tmpRow, col: i });
          }
        }
      }
      // vertical orientation has been selected
      else if (orientation === 1) {
        if (isInBoundsVertically({ row: tmpRow, col: tmpCol }, shipLength)) {
          for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {
            removeBoxHighlight({ row: i, col: tmpCol });
            removeOutOfBounds({ row: i, col: tmpCol });
          }
        } else {
          for (let i = tmpRow; i < 10; i += 1) {
            removeOutOfBounds({ row: i, col: tmpCol });
          }
        }
      }
    }
  }
};

const initHighlighting = () => {
  setupBoard.addEventListener("mouseover", addHighlighting);
  setupBoard.addEventListener("mouseout", removeHighlighting);
};

const handleOrientationToggle = (event) => {
  const orientationButton = event.target;
  if (orientationButton.textContent === "Horizontal") {
    orientationButton.textContent = "Vertical";
    orientation = 1;
    initHighlighting();
  } else {
    orientationButton.textContent = "Horizontal";
    orientation = 0;
    initHighlighting();
  }
};

toggleOrientationButton.addEventListener("click", handleOrientationToggle);

export {
  hideWelcome,
  displaySetupBoard,
  initGameBoards,
  renderFriendlyBoard,
  renderEnemyBoard,
  showSetup,
  hideSetup,
  resetSetup,
  showGameBoards,
  hideGameBoards,
  boxIsAlreadySelected,
  selectBox,
  highlightBox,
  removeBoxHighlight,
  removeOutOfBounds,
  showOutOfBounds,
  incrementShipCount,
  initHighlighting,
  hasShipAlreadyBeenPlacedInPath,
  isInBoundsHorizontally,
  isInBoundsVertically,
  showWinnerModal,
  hideWinnerModal,
  resetGameBoards,
};
