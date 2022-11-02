/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/scripts/board.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/scripts/player.js\");\n/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer */ \"./src/scripts/computer.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ \"./src/scripts/ship.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game */ \"./src/scripts/game.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom */ \"./src/scripts/dom.js\");\n/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rules */ \"./src/scripts/rules.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst toggleOrientationButton = document.getElementById(\"toggle-orientation\");\r\nconst setupBoard = document.querySelector(\".friendly-board-setup\");\r\nconst friendlyBoard = document.querySelector(\".friendly-board\");\r\nconst enemyBoard = document.querySelector(\".enemy-board\");\r\n\r\nconst player = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"Player\", (0,_board__WEBPACK_IMPORTED_MODULE_0__[\"default\"])());\r\nconst computer = (0,_computer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"Computer\", (0,_board__WEBPACK_IMPORTED_MODULE_0__[\"default\"])());\r\nconst game = (0,_game__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(player, computer);\r\nconst startingShipCount = (0,_rules__WEBPACK_IMPORTED_MODULE_6__[\"default\"])().ships.length;\r\nlet countShipsPlaced = 0;\r\nlet orientation = 0; // 0 is for horizontal, 1 is for vertical\r\n\r\nconst isInBoundsHorizontally = (coords) => {\r\n  const shipLength = (0,_rules__WEBPACK_IMPORTED_MODULE_6__[\"default\"])().ships[countShipsPlaced].length;\r\n  return (\r\n    document\r\n      .querySelector(\".friendly-board-setup\")\r\n      .querySelector(\r\n        `[data-row='${coords.row}'][data-col='${\r\n          coords.col + (shipLength - 1)\r\n        }']`\r\n      ) !== null\r\n  );\r\n};\r\n\r\nconst isInBoundsVertically = (coords) => {\r\n  const shipLength = (0,_rules__WEBPACK_IMPORTED_MODULE_6__[\"default\"])().ships[countShipsPlaced].length;\r\n  return (\r\n    document\r\n      .querySelector(\".friendly-board-setup\")\r\n      .querySelector(\r\n        `[data-row='${coords.row + shipLength - 1}'][data-col='${coords.col}']`\r\n      ) !== null\r\n  );\r\n};\r\n\r\nconst addHighlighting = (event) => {\r\n  if (countShipsPlaced !== startingShipCount) {\r\n    if (event.target.classList.contains(\"box\")) {\r\n      if (orientation === 0) {\r\n        const tmpRow = Number(event.target.dataset.row);\r\n        const tmpCol = Number(event.target.dataset.col);\r\n        const shipLength = (0,_rules__WEBPACK_IMPORTED_MODULE_6__[\"default\"])().ships[countShipsPlaced].length;\r\n        if (isInBoundsHorizontally({ row: tmpRow, col: tmpCol })) {\r\n          for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {\r\n            _dom__WEBPACK_IMPORTED_MODULE_5__.highlightBox({ row: tmpRow, col: i });\r\n          }\r\n        } else {\r\n          for (let i = tmpCol; i < 10; i += 1) {\r\n            _dom__WEBPACK_IMPORTED_MODULE_5__.showOutOfBounds({ row: tmpRow, col: i });\r\n          }\r\n        }\r\n      } else {\r\n        const tmpRow = Number(event.target.dataset.row);\r\n        const tmpCol = Number(event.target.dataset.col);\r\n        const shipLength = (0,_rules__WEBPACK_IMPORTED_MODULE_6__[\"default\"])().ships[countShipsPlaced].length;\r\n        if (isInBoundsVertically({ row: tmpRow, col: tmpCol }, shipLength)) {\r\n          for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {\r\n            _dom__WEBPACK_IMPORTED_MODULE_5__.highlightBox({ row: i, col: tmpCol });\r\n          }\r\n        } else {\r\n          for (let i = tmpRow; i < 10; i += 1) {\r\n            _dom__WEBPACK_IMPORTED_MODULE_5__.showOutOfBounds({ row: i, col: tmpCol });\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n};\r\n\r\nconst removeHighlighting = (event) => {\r\n  if (countShipsPlaced !== startingShipCount) {\r\n    if (event.target.classList.contains(\"box\")) {\r\n      if (orientation === 0) {\r\n        const tmpRow = Number(event.target.dataset.row);\r\n        const tmpCol = Number(event.target.dataset.col);\r\n        const shipLength = (0,_rules__WEBPACK_IMPORTED_MODULE_6__[\"default\"])().ships[countShipsPlaced].length;\r\n        if (isInBoundsHorizontally({ row: tmpRow, col: tmpCol }, shipLength)) {\r\n          for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {\r\n            _dom__WEBPACK_IMPORTED_MODULE_5__.removeBoxHighlight({ row: tmpRow, col: i });\r\n          }\r\n        } else {\r\n          for (let i = tmpCol; i < 10; i += 1) {\r\n            _dom__WEBPACK_IMPORTED_MODULE_5__.removeOutOfBounds({ row: tmpRow, col: i });\r\n          }\r\n        }\r\n      } else {\r\n        const tmpRow = Number(event.target.dataset.row);\r\n        const tmpCol = Number(event.target.dataset.col);\r\n        const shipLength = (0,_rules__WEBPACK_IMPORTED_MODULE_6__[\"default\"])().ships[countShipsPlaced].length;\r\n        if (isInBoundsVertically({ row: tmpRow, col: tmpCol }, shipLength)) {\r\n          for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {\r\n            _dom__WEBPACK_IMPORTED_MODULE_5__.removeBoxHighlight({ row: i, col: tmpCol });\r\n          }\r\n        } else {\r\n          for (let i = tmpRow; i < 10; i += 1) {\r\n            _dom__WEBPACK_IMPORTED_MODULE_5__.removeOutOfBounds({ row: i, col: tmpCol });\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n};\r\n\r\nconst initHighlighting = () => {\r\n  setupBoard.addEventListener(\"mouseover\", addHighlighting);\r\n  setupBoard.addEventListener(\"mouseout\", removeHighlighting);\r\n};\r\n\r\nconst startGame = () => {\r\n  _dom__WEBPACK_IMPORTED_MODULE_5__.initGameBoards(10); // setup the boards with blocks in 10 x 10 configuration\r\n  _dom__WEBPACK_IMPORTED_MODULE_5__.renderFriendlyBoard(player.getBoard());\r\n  _dom__WEBPACK_IMPORTED_MODULE_5__.renderEnemyBoard(computer.getBoard());\r\n  enemyBoard.addEventListener(\"click\", (event) => {\r\n    if (!game.isGameOver()) {\r\n      // check that a box has been clicked\r\n      if (event.target.classList.contains(\"box\")) {\r\n        // box in the enemy board has been selected\r\n        if (event.target.parentNode.classList.contains(\"enemy-board\")) {\r\n          // Player Turn\r\n          const { row, col } = event.target.dataset; // grab row and col values from html data attribute\r\n          game.playTurn({ row, col }); // play turn for human player\r\n          _dom__WEBPACK_IMPORTED_MODULE_5__.renderEnemyBoard(computer.getBoard()); // render human player's attack on computers board\r\n          if (game.isGameOver()) {\r\n            console.log(game.getWinner().getName());\r\n          } else {\r\n            // Allow Computer to take a turn\r\n            game.playComputerTurn();\r\n            _dom__WEBPACK_IMPORTED_MODULE_5__.renderFriendlyBoard(player.getBoard()); // render computer's attack on human player's board\r\n            if (game.isGameOver()) {\r\n              console.log(game.getWinner().getName());\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  });\r\n};\r\n\r\nconst setup = () => {\r\n  // BEGIN SETUP\r\n  _dom__WEBPACK_IMPORTED_MODULE_5__.hideGameBoards();\r\n  _dom__WEBPACK_IMPORTED_MODULE_5__.displaySetupBoard(10);\r\n  initHighlighting();\r\n\r\n  const handleSetupBoardPlaceShip = (event) => {\r\n    if (countShipsPlaced !== startingShipCount) {\r\n      // check that a box has been clicked\r\n      if (event.target.classList.contains(\"box\")) {\r\n        const shipLength = (0,_rules__WEBPACK_IMPORTED_MODULE_6__[\"default\"])().ships[countShipsPlaced].length;\r\n        // horizontal orientation has been selected\r\n        if (orientation === 0) {\r\n          const tmpRow = Number(event.target.dataset.row);\r\n          const tmpCol = Number(event.target.dataset.col);\r\n\r\n          // selected coords are in bounds\r\n          if (isInBoundsHorizontally({ row: tmpRow, col: tmpCol })) {\r\n            for (let i = tmpCol; i < tmpCol + shipLength; i += 1) {\r\n              _dom__WEBPACK_IMPORTED_MODULE_5__.selectBox({ row: tmpRow, col: i });\r\n            }\r\n            game.placePlayerShip(\r\n              { row: tmpRow, col: tmpCol },\r\n              orientation,\r\n              (0,_ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(shipLength)\r\n            );\r\n            countShipsPlaced += 1;\r\n          }\r\n        }\r\n        // vertical orientation has been selected\r\n        else {\r\n          const tmpRow = Number(event.target.dataset.row);\r\n          const tmpCol = Number(event.target.dataset.col);\r\n          if (isInBoundsVertically({ row: tmpRow, col: tmpCol }, shipLength)) {\r\n            for (let i = tmpRow; i < tmpRow + shipLength; i += 1) {\r\n              _dom__WEBPACK_IMPORTED_MODULE_5__.selectBox({ row: i, col: tmpCol });\r\n            }\r\n            game.placePlayerShip(\r\n              { row: tmpRow, col: tmpCol },\r\n              orientation,\r\n              (0,_ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(shipLength)\r\n            );\r\n            countShipsPlaced += 1;\r\n          }\r\n        }\r\n      }\r\n    } else {\r\n      // startGame();\r\n    }\r\n  };\r\n\r\n  const handleOrientationToggle = (event) => {\r\n    const orientationButton = event.target;\r\n    if (orientationButton.textContent === \"Horizontal\") {\r\n      orientationButton.textContent = \"Vertical\";\r\n      orientation = 1;\r\n      initHighlighting();\r\n    } else {\r\n      orientationButton.textContent = \"Horizontal\";\r\n      orientation = 0;\r\n      initHighlighting();\r\n    }\r\n  };\r\n\r\n  setupBoard.addEventListener(\"click\", handleSetupBoardPlaceShip);\r\n  toggleOrientationButton.addEventListener(\"click\", handleOrientationToggle);\r\n};\r\n\r\nsetup();\r\n\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/board.js":
/*!******************************!*\
  !*** ./src/scripts/board.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// factory function for creating gameboards\r\nconst boardFactory = () => {\r\n  const board = [\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n  ];\r\n\r\n  const hits = [];\r\n\r\n  const misses = [];\r\n\r\n  const ships = [];\r\n\r\n  const getHits = () => hits;\r\n\r\n  const getMisses = () => misses;\r\n\r\n  const placeShip = (coords, ship) => {\r\n    board[coords.row][coords.col] = ship;\r\n    ships.push(ship);\r\n  };\r\n\r\n  const spotContainsShip = (coords) => board[coords.row][coords.col] !== null;\r\n\r\n  const receiveAttack = (coords) => {\r\n    if (spotContainsShip(coords)) {\r\n      const ship = board[coords.row][coords.col];\r\n      ship.hit();\r\n      hits.push(coords);\r\n    } else {\r\n      misses.push(coords);\r\n    }\r\n  };\r\n\r\n  const areAllShipsSunk = () => {\r\n    // check if ships array is empty\r\n    if (ships.length === 0) {\r\n      throw new Error(\"There are no ships on the gameboard!\");\r\n    }\r\n    for (let i = 0; i < ships.length; i += 1) {\r\n      const ship = ships[i];\r\n      if (!ship.isSunk()) return false;\r\n    }\r\n    return true;\r\n  };\r\n\r\n  return { placeShip, receiveAttack, getHits, getMisses, areAllShipsSunk };\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boardFactory);\r\n\n\n//# sourceURL=webpack:///./src/scripts/board.js?");

/***/ }),

/***/ "./src/scripts/computer.js":
/*!*********************************!*\
  !*** ./src/scripts/computer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/scripts/player.js\");\n\r\n\r\nconst computerFactory = (name = \"Computer\", gameBoard = null) => {\r\n  const newComputer = Object.create((0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name, gameBoard));\r\n\r\n  newComputer.attackList = [];\r\n\r\n  newComputer.getRandomIntInclusive = (min, max) => {\r\n    const minVal = Math.ceil(min);\r\n    const maxVal = Math.floor(max);\r\n    return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal); // The maximum is inclusive and the minimum is inclusive};\r\n  };\r\n\r\n  newComputer.randomCoords = () => {\r\n    const row = newComputer.getRandomIntInclusive(0, 9);\r\n    const col = newComputer.getRandomIntInclusive(0, 9);\r\n    return { row, col };\r\n  };\r\n\r\n  newComputer.hasAttackedCoords = (coords) => {\r\n    if (\r\n      newComputer.attackList.find(\r\n        (e) => e.row === coords.row && e.col === coords.col\r\n      )\r\n    ) {\r\n      return true; // coords have been found in attack list\r\n    }\r\n\r\n    return false; // coords are unique\r\n  };\r\n\r\n  newComputer.recordAttack = (coords) => newComputer.attackList.push(coords);\r\n\r\n  newComputer.getAttackList = () => newComputer.attackList;\r\n\r\n  newComputer.getNewAttackCoords = () => {\r\n    let uniqueCoords = false;\r\n    let coords = null;\r\n    while (!uniqueCoords) {\r\n      coords = newComputer.randomCoords(); // pick some random coords\r\n      // Only uses these coords if they have not been selected before\r\n      if (newComputer.hasAttackedCoords(coords)) {\r\n        uniqueCoords = false;\r\n      } else {\r\n        uniqueCoords = true;\r\n      }\r\n    }\r\n    return coords;\r\n  };\r\n\r\n  return Object.freeze(newComputer);\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computerFactory);\r\n\n\n//# sourceURL=webpack:///./src/scripts/computer.js?");

/***/ }),

/***/ "./src/scripts/dom.js":
/*!****************************!*\
  !*** ./src/scripts/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"displaySetupBoard\": () => (/* binding */ displaySetupBoard),\n/* harmony export */   \"hideGameBoards\": () => (/* binding */ hideGameBoards),\n/* harmony export */   \"highlightBox\": () => (/* binding */ highlightBox),\n/* harmony export */   \"initGameBoards\": () => (/* binding */ initGameBoards),\n/* harmony export */   \"removeBoxHighlight\": () => (/* binding */ removeBoxHighlight),\n/* harmony export */   \"removeOutOfBounds\": () => (/* binding */ removeOutOfBounds),\n/* harmony export */   \"renderEnemyBoard\": () => (/* binding */ renderEnemyBoard),\n/* harmony export */   \"renderFriendlyBoard\": () => (/* binding */ renderFriendlyBoard),\n/* harmony export */   \"selectBox\": () => (/* binding */ selectBox),\n/* harmony export */   \"showOutOfBounds\": () => (/* binding */ showOutOfBounds)\n/* harmony export */ });\nconst friendlyBoard = document.querySelector(\".friendly-board\");\r\nconst enemyBoard = document.querySelector(\".enemy-board\");\r\nconst setupBoard = document.querySelector(\".friendly-board-setup\");\r\nconst symbolForMiss = \"X\";\r\nconst symbolForHit = \"*\";\r\n\r\nconst hideGameBoards = () => {\r\n  document.querySelector(\".game-boards\").style.display = \"none\";\r\n};\r\n\r\nconst selectBox = (coords) => {\r\n  const selectedBox = setupBoard.querySelector(\r\n    `[data-row='${coords.row}'][data-col='${coords.col}']`\r\n  );\r\n  selectedBox.classList.add(\"selected-box\");\r\n};\r\n\r\nconst highlightBox = (coords) => {\r\n  const selectedBox = setupBoard.querySelector(\r\n    `[data-row='${coords.row}'][data-col='${coords.col}']`\r\n  );\r\n  selectedBox.classList.add(\"highlighted-box\");\r\n};\r\n\r\nconst removeBoxHighlight = (coords) => {\r\n  const selectedBox = setupBoard.querySelector(\r\n    `[data-row='${coords.row}'][data-col='${coords.col}']`\r\n  );\r\n  selectedBox.classList.remove(\"highlighted-box\");\r\n};\r\n\r\nconst showOutOfBounds = (coords) => {\r\n  const selectedBox = setupBoard.querySelector(\r\n    `[data-row='${coords.row}'][data-col='${coords.col}']`\r\n  );\r\n  selectedBox.classList.add(\"out-of-bounds\");\r\n};\r\n\r\nconst removeOutOfBounds = (coords) => {\r\n  const selectedBox = setupBoard.querySelector(\r\n    `[data-row='${coords.row}'][data-col='${coords.col}']`\r\n  );\r\n  selectedBox.classList.remove(\"out-of-bounds\");\r\n};\r\n\r\nconst addBoxesToBoard = (size, board) => {\r\n  for (let i = 0; i < size; i += 1) {\r\n    for (let j = 0; j < size; j += 1) {\r\n      const box = document.createElement(\"div\");\r\n      box.classList = \"box\";\r\n      box.dataset.row = i;\r\n      box.dataset.col = j;\r\n\r\n      board.appendChild(box);\r\n    }\r\n  }\r\n};\r\n\r\nconst displaySetupBoard = (size = 10) => {\r\n  addBoxesToBoard(size, setupBoard);\r\n};\r\n\r\nconst initGameBoards = (size = 10) => {\r\n  // create game boards with a size x size configuartion\r\n  // example: input of 10 will create a 100 box board in a 10 x 10 configuration\r\n  addBoxesToBoard(size, friendlyBoard);\r\n  addBoxesToBoard(size, enemyBoard);\r\n};\r\n\r\nconst renderMisses = (arry, domBoard) => {\r\n  arry.forEach((el) => {\r\n    const box = domBoard.querySelectorAll(`[data-row='${el.row}']`)[el.col]; // associate the coord obj's row and col with the data-row and col values present on the dom\r\n    box.textContent = symbolForMiss;\r\n  });\r\n};\r\n\r\nconst renderHits = (arry, domBoard) => {\r\n  arry.forEach((el) => {\r\n    const box = domBoard.querySelectorAll(`[data-row='${el.row}']`)[el.col]; // associate the coord obj's row and col with the data-row and col values present on the dom\r\n    box.textContent = symbolForHit;\r\n  });\r\n};\r\n\r\nconst renderFriendlyBoard = (board) => {\r\n  renderMisses(board.getMisses(), friendlyBoard);\r\n  renderHits(board.getHits(), friendlyBoard);\r\n};\r\n\r\nconst renderEnemyBoard = (board) => {\r\n  renderMisses(board.getMisses(), enemyBoard);\r\n  renderHits(board.getHits(), enemyBoard);\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/scripts/dom.js?");

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst gameFactory = (player, computer) => {\r\n  const placePlayerShip = (startingCoords, orientation, ship) => {\r\n    const tmpRow = startingCoords.row;\r\n    const tmpCol = startingCoords.col;\r\n    const shipSize = ship.getLength();\r\n    // horizontal ship placement\r\n    if (orientation === 0) {\r\n      if (tmpCol + ship.getLength() - 1 > 9) {\r\n        throw new Error(\"Ship placement exceeds the allocated board space\");\r\n      }\r\n      for (let i = tmpCol; i < tmpCol + shipSize; i += 1) {\r\n        player.getBoard().placeShip({ row: tmpRow, col: i }, ship);\r\n      }\r\n    }\r\n    // vertical ship placement\r\n    else {\r\n      if (tmpRow + ship.getLength() - 1 > 9) {\r\n        throw new Error(\"Ship placement exceeds the allocated board space\");\r\n      }\r\n      for (let i = tmpRow; i < tmpRow + shipSize; i += 1) {\r\n        player.getBoard().placeShip({ row: i, col: tmpCol }, ship);\r\n      }\r\n    }\r\n  };\r\n\r\n  const placeComputerShip = (startingCoords, orientation, ship) => {\r\n    const tmpRow = startingCoords.row;\r\n    const tmpCol = startingCoords.col;\r\n    const shipSize = ship.getLength();\r\n    // horizontal ship placement\r\n    if (orientation === 0) {\r\n      if (tmpCol + ship.getLength() - 1 > 9) {\r\n        throw new Error(\"Ship placement exceeds the allocated board space\");\r\n      }\r\n      for (let i = tmpCol; i < tmpCol + shipSize; i += 1) {\r\n        computer.getBoard().placeShip({ row: tmpRow, col: i }, ship);\r\n      }\r\n    }\r\n    // vertical ship placement\r\n    else {\r\n      if (tmpRow + ship.getLength() - 1 > 9) {\r\n        throw new Error(\"Ship placement exceeds the allocated board space\");\r\n      }\r\n      for (let i = tmpRow; i < tmpRow + shipSize; i += 1) {\r\n        computer.getBoard().placeShip({ row: i, col: tmpCol }, ship);\r\n      }\r\n    }\r\n  };\r\n\r\n  const playTurn = (coords) => {\r\n    computer.getBoard().receiveAttack(coords);\r\n  };\r\n\r\n  const playComputerTurn = () => {\r\n    const computerAttackCoords = computer.getNewAttackCoords(); // computer fetches unused attack coords\r\n    player.getBoard().receiveAttack(computerAttackCoords); // computer attacks playerBoard\r\n    computer.recordAttack(computerAttackCoords); // computer adds the previously used attacks coords to its attack history\r\n  };\r\n\r\n  const isGameOver = () => {\r\n    try {\r\n      const playerHasBeenSunk = player.getBoard().areAllShipsSunk();\r\n      const computerHasBeenSunk = computer.getBoard().areAllShipsSunk();\r\n      if (playerHasBeenSunk || computerHasBeenSunk) {\r\n        return true;\r\n      }\r\n      return false;\r\n    } catch (error) {\r\n      if (error.message === \"There are no ships on the gameboard!\")\r\n        throw new Error(\r\n          \"Unable to determine game status - a player is using an empty gameboard\"\r\n        );\r\n      else {\r\n        return error;\r\n      }\r\n    }\r\n  };\r\n\r\n  const getWinner = () => {\r\n    const playerHasBeenSunk = player.getBoard().areAllShipsSunk();\r\n    const computerHasBeenSunk = computer.getBoard().areAllShipsSunk();\r\n    let winner = null;\r\n    if (!playerHasBeenSunk && computerHasBeenSunk) {\r\n      winner = player;\r\n    } else if (!computerHasBeenSunk && playerHasBeenSunk) {\r\n      winner = computer;\r\n    }\r\n    return winner;\r\n  };\r\n\r\n  return {\r\n    playTurn,\r\n    playComputerTurn,\r\n    isGameOver,\r\n    getWinner,\r\n    placePlayerShip,\r\n    placeComputerShip,\r\n  };\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameFactory);\r\n\n\n//# sourceURL=webpack:///./src/scripts/game.js?");

/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst playerFactory = (name = \"Player\", gameBoard = null) => {\r\n  const getName = () => name;\r\n\r\n  const getBoard = () => gameBoard;\r\n\r\n  return { getName, getBoard };\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playerFactory);\r\n\n\n//# sourceURL=webpack:///./src/scripts/player.js?");

/***/ }),

/***/ "./src/scripts/rules.js":
/*!******************************!*\
  !*** ./src/scripts/rules.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst rules = {\r\n  ships: [\r\n    { name: \"CARRIER\", length: 5 },\r\n    { name: \"BATTLESHIP\", length: 4 },\r\n    { name: \"CRUISER\", length: 3 },\r\n    { name: \"SUBMARINE\", length: 3 },\r\n    { name: \"DESTROYER\", length: 2 },\r\n  ],\r\n};\r\n\r\nconst getRules = () => rules;\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRules);\r\n\n\n//# sourceURL=webpack:///./src/scripts/rules.js?");

/***/ }),

/***/ "./src/scripts/ship.js":
/*!*****************************!*\
  !*** ./src/scripts/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// factory function for creating ships\r\nconst shipFactory = (length) => {\r\n  const getLength = () => length;\r\n  let hits = 0;\r\n  const getHits = () => hits;\r\n  const isSunk = () => hits === length;\r\n  const hit = () => {\r\n    hits += 1;\r\n  };\r\n  return { getHits, hit, isSunk, getLength };\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);\r\n\n\n//# sourceURL=webpack:///./src/scripts/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/app.js");
/******/ 	
/******/ })()
;