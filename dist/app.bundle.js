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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/scripts/board.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/scripts/player.js\");\n/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer */ \"./src/scripts/computer.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ \"./src/scripts/ship.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom */ \"./src/scripts/dom.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst main = () => {\r\n  const playerBoard = (0,_board__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n  const playerShip1 = (0,_ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(3);\r\n  playerBoard.placeShip(5, 5, playerShip1);\r\n  playerBoard.placeShip(5, 6, playerShip1);\r\n  playerBoard.placeShip(5, 7, playerShip1);\r\n  const playerShip2 = (0,_ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(1);\r\n  playerBoard.placeShip(2, 3, playerShip2);\r\n  const playerShip3 = (0,_ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(1);\r\n  playerBoard.placeShip(9, 1, playerShip3);\r\n  const player = (0,_player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"Player\", playerBoard);\r\n  playerBoard.receiveAttack(3, 4);\r\n  playerBoard.receiveAttack(5, 5);\r\n  playerBoard.receiveAttack(5, 6);\r\n\r\n  const computerBoard = (0,_board__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n  const computerShip1 = (0,_ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(3);\r\n  computerBoard.placeShip(5, 5, computerShip1);\r\n  computerBoard.placeShip(5, 6, computerShip1);\r\n  computerBoard.placeShip(5, 7, computerShip1);\r\n  const computerShip2 = (0,_ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(1);\r\n  computerBoard.placeShip(2, 3, computerShip2);\r\n  const computerShip3 = (0,_ship__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(1);\r\n  computerBoard.placeShip(9, 1, computerShip3);\r\n  const computer = (0,_computer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\"Computer\", computerBoard);\r\n  computerBoard.receiveAttack(3, 4);\r\n  computerBoard.receiveAttack(5, 5);\r\n  computerBoard.receiveAttack(9, 1);\r\n  computerBoard.receiveAttack(9, 2);\r\n\r\n  // setup the boards with blocks in 10 x 10 configuration\r\n  _dom__WEBPACK_IMPORTED_MODULE_4__.initGameBoards(10);\r\n  _dom__WEBPACK_IMPORTED_MODULE_4__.renderFriendlyBoard(player.getBoard());\r\n  _dom__WEBPACK_IMPORTED_MODULE_4__.renderEnemyBoard(computer.getBoard());\r\n\r\n  let gameOver = false;\r\n  let playerTurn = player;\r\n  // while (!gameOver) {\r\n  //   //do stuff\r\n\r\n  //   if (player.playerBoard.areAllShipsSunk) {\r\n  //     console.log(`${player.getName()}'s ships have been sunk. ${computer.getName()} wins!`);\r\n  //     gameOver = true;\r\n  //   }\r\n  //   if (computer.playerBoard.areAllShipsSunk) {\r\n  //     console.log(`${computer.getName()}'s ships have been sunk. ${player.getName()} wins!`);\r\n  //     gameOver = true;\r\n  //   }\r\n  // }\r\n};\r\n\r\nmain();\r\n\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/board.js":
/*!******************************!*\
  !*** ./src/scripts/board.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// factory function for creating gameboards\r\nconst boardFactory = () => {\r\n  const board = [\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n    [null, null, null, null, null, null, null, null, null, null],\r\n  ];\r\n\r\n  const hits = [];\r\n\r\n  const misses = [];\r\n\r\n  const ships = [];\r\n\r\n  const getHits = () => hits;\r\n\r\n  const getMisses = () => misses;\r\n\r\n  const placeShip = (row, col, ship) => {\r\n    board[row][col] = ship;\r\n    ships.push(ship);\r\n  };\r\n\r\n  const spotContainsShip = (row, col) => board[row][col] !== null;\r\n\r\n  const receiveAttack = (row, col) => {\r\n    if (spotContainsShip(row, col)) {\r\n      const ship = board[row][col];\r\n      ship.hit();\r\n      hits.push({ row, col });\r\n    } else {\r\n      misses.push({ row, col });\r\n    }\r\n  };\r\n\r\n  const areAllShipsSunk = () => {\r\n    for (let i = 0; i < ships.length; i += 1) {\r\n      const ship = ships[i];\r\n      if (!ship.isSunk()) return false;\r\n    }\r\n    return true;\r\n  };\r\n\r\n  return { placeShip, receiveAttack, getHits, getMisses, areAllShipsSunk };\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boardFactory);\r\n\n\n//# sourceURL=webpack:///./src/scripts/board.js?");

/***/ }),

/***/ "./src/scripts/computer.js":
/*!*********************************!*\
  !*** ./src/scripts/computer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/scripts/player.js\");\n\r\n\r\nconst computerFactory = (name, gameBoard) => {\r\n  let newComputer = Object.create((0,_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name, gameBoard));\r\n\r\n  newComputer.attackList = [];\r\n\r\n  newComputer.getRandomIntInclusive = (min, max) => {\r\n    const minVal = Math.ceil(min);\r\n    const maxVal = Math.floor(max);\r\n    return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal); // The maximum is inclusive and the minimum is inclusive};\r\n  };\r\n\r\n  newComputer.randomCoords = () => {\r\n    const row = newComputer.getRandomIntInclusive(0, 9);\r\n    const col = newComputer.getRandomIntInclusive(0, 9);\r\n    return { row, col };\r\n  };\r\n\r\n  newComputer.hasAttackedCoords = (coords) => {\r\n    if (newComputer.attackList.find((e) => e.row === coords.row && e.col === coords.col)) {\r\n      // coords have been found in attack list\r\n      return true;\r\n    }\r\n    // coords are unique\r\n    return false;\r\n  };\r\n\r\n  newComputer.recordAttack = (coords) => newComputer.attackList.push(coords);\r\n\r\n  newComputer.getAttackList = () => newComputer.attackList;\r\n\r\n  newComputer.getNewAttackCoords = () => {\r\n    let uniqueCoords = false;\r\n    let coords = null;\r\n    while (!uniqueCoords) {\r\n      // pick some random coords\r\n      coords = newComputer.randomCoords();\r\n      // Only uses these coords if they have not been selected before\r\n      if (newComputer.hasAttackedCoords(coords)) {\r\n        uniqueCoords = false;\r\n      } else {\r\n        uniqueCoords = true;\r\n      }\r\n    }\r\n    return coords;\r\n  };\r\n\r\n  return Object.freeze(newComputer);\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computerFactory);\r\n\n\n//# sourceURL=webpack:///./src/scripts/computer.js?");

/***/ }),

/***/ "./src/scripts/dom.js":
/*!****************************!*\
  !*** ./src/scripts/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initGameBoards\": () => (/* binding */ initGameBoards),\n/* harmony export */   \"renderEnemyBoard\": () => (/* binding */ renderEnemyBoard),\n/* harmony export */   \"renderFriendlyBoard\": () => (/* binding */ renderFriendlyBoard)\n/* harmony export */ });\nconst friendlyBoard = document.querySelector(\".friendly-board\");\r\nconst enemyBoard = document.querySelector(\".enemy-board\");\r\nconst symbolForMiss = \"X\";\r\nconst symbolForHit = \"*\";\r\n\r\nconst selectedBlock = (e) => {\r\n  console.log(e.target);\r\n};\r\n\r\nconst initGameBoards = (size) => {\r\n  // create game boards with a size x size configuartion\r\n  // example: input of 10 will create a 100 box board in a 10 x 10 configuration\r\n  for (let i = 0; i < size; i += 1) {\r\n    for (let j = 0; j < size; j += 1) {\r\n      const box = document.createElement(\"div\");\r\n      box.classList = \"box\";\r\n      box.dataset.row = i;\r\n      box.dataset.column = j;\r\n      // create a clone so we can init blocks to friendlyBoard and enemBoard at the same time\r\n      const box2 = box.cloneNode(true);\r\n      // take user input - a click box represents an attack\r\n      box.addEventListener(\"click\", selectedBlock);\r\n      box2.addEventListener(\"click\", selectedBlock);\r\n\r\n      friendlyBoard.appendChild(box);\r\n      enemyBoard.appendChild(box2);\r\n    }\r\n  }\r\n};\r\n\r\nconst renderMisses = (arry, domBoard) => {\r\n  arry.forEach((el) => {\r\n    // associate the coord obj's row and col with the data-row and col values present on the dom\r\n    const box = domBoard.querySelectorAll(`[data-row='${el.row}']`)[el.col];\r\n    box.textContent = symbolForMiss;\r\n  });\r\n};\r\n\r\nconst renderHits = (arry, domBoard) => {\r\n  arry.forEach((el) => {\r\n    // associate the coord obj's row and col with the data-row and col values present on the dom\r\n    const box = domBoard.querySelectorAll(`[data-row='${el.row}']`)[el.col];\r\n    box.textContent = symbolForHit;\r\n  });\r\n};\r\n\r\nconst renderFriendlyBoard = (board) => {\r\n  renderMisses(board.getMisses(), friendlyBoard);\r\n  renderHits(board.getHits(), friendlyBoard);\r\n};\r\n\r\nconst renderEnemyBoard = (board) => {\r\n  renderMisses(board.getMisses(), enemyBoard);\r\n  renderHits(board.getHits(), enemyBoard);\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/scripts/dom.js?");

/***/ }),

/***/ "./src/scripts/player.js":
/*!*******************************!*\
  !*** ./src/scripts/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst playerFactory = (name, gameBoard) => {\r\n  const getName = () => name;\r\n\r\n  const getBoard = () => gameBoard;\r\n\r\n  return { getName, getBoard };\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playerFactory);\r\n\n\n//# sourceURL=webpack:///./src/scripts/player.js?");

/***/ }),

/***/ "./src/scripts/ship.js":
/*!*****************************!*\
  !*** ./src/scripts/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// factory function for creating ships\r\nconst shipFactory = (length) => {\r\n  let hits = 0;\r\n  const getHits = () => hits;\r\n  const isSunk = () => hits === length;\r\n  const hit = () => {\r\n    hits += 1;\r\n  };\r\n  return { getHits, hit, isSunk };\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipFactory);\r\n\n\n//# sourceURL=webpack:///./src/scripts/ship.js?");

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