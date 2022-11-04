import gameFactory from "../scripts/game";
import playerFactory from "../scripts/player";
import boardFactory from "../scripts/board";
import computerFactory from "../scripts/computer";
import shipFactory from "../scripts/ship";

test("attempting to computer ship outside board range - horizontally", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 0; // horizontal placement
  expect(() =>
    game.placeComputerShip({ row: 1, col: 6 }, orientation, ship)
  ).toThrow("Ship placement exceeds the allocated board space");
});

test("attempting to place computer ship outside board range - vertically", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 1; // horizontal placement
  expect(() =>
    game.placeComputerShip({ row: 6, col: 6 }, orientation, ship)
  ).toThrow("Ship placement exceeds the allocated board space");
});

test("placing computer ship through game start - ship has a hit", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 0; // horizontal placement
  game.placeComputerShip({ row: 1, col: 1 }, orientation, ship);
  const computerBoard = computer.getBoard();
  computerBoard.receiveAttack({ row: 1, col: 1 });
  expect(ship.getHits()).toBe(1);
});

test("attempting to place ship outside board range - horizontally", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 0; // horizontal placement
  expect(() =>
    game.placePlayerShip({ row: 1, col: 6 }, orientation, ship)
  ).toThrow("Ship placement exceeds the allocated board space");
});

test("attempting to place player ship outside board range - vertically", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 1; // horizontal placement
  expect(() =>
    game.placePlayerShip({ row: 6, col: 6 }, orientation, ship)
  ).toThrow("Ship placement exceeds the allocated board space");
});

test("placing player ships through game start - ship has a hit", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 0; // horizontal placement
  game.placePlayerShip({ row: 1, col: 1 }, orientation, ship);
  const playerBoard = player.getBoard();
  playerBoard.receiveAttack({ row: 1, col: 1 });
  expect(ship.getHits()).toBe(1);
});

test("game is not over - a player's board is empty", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const game = gameFactory(player, computer);
  expect(() => game.isGameOver()).toThrow(
    "Unable to determine game status - a player is using an empty gameboard"
  );
});

test("game is not over - in progress", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const game = gameFactory(player, computer);
  game.placePlayerShip({ row: 1, col: 2 }, 0, shipFactory(1));
  game.placeComputerShip({ row: 1, col: 2 }, 0, shipFactory(1));
  computer.getBoard().receiveAttack({ row: 1, col: 5 });

  expect(game.isGameOver()).toBeFalsy();
});

test("game is over - computer is sunk", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const game = gameFactory(player, computer);

  game.placePlayerShip({ row: 1, col: 2 }, 0, shipFactory(1));
  game.placeComputerShip({ row: 1, col: 2 }, 0, shipFactory(1));

  computer.getBoard().receiveAttack({ row: 1, col: 2 });
  expect(game.isGameOver()).toBeTruthy();
});

test("game is over - player is sunk", () => {
  const player = playerFactory("Player", boardFactory());
  player.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));
  const computer = computerFactory("Computer", boardFactory());
  computer.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));

  player.getBoard().receiveAttack({ row: 1, col: 2 });

  const game = gameFactory(player, computer);
  expect(game.isGameOver()).toBeTruthy();
});

test("winner is computer", () => {
  const player = playerFactory("Player", boardFactory());
  player.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));
  const computer = computerFactory("Computer", boardFactory());
  computer.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));

  player.getBoard().receiveAttack({ row: 1, col: 2 });

  const game = gameFactory(player, computer);
  expect(game.getWinner()).toBe(computer);
});

test("winner is player", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const game = gameFactory(player, computer);

  game.placePlayerShip({ row: 1, col: 2 }, 0, shipFactory(1));
  game.placeComputerShip({ row: 1, col: 2 }, 0, shipFactory(1));

  player.getBoard().receiveAttack({ row: 1, col: 4 });
  computer.getBoard().receiveAttack({ row: 1, col: 2 });

  expect(game.getWinner()).toBe(player);
});

test("no one has won", () => {
  const player = playerFactory("Player", boardFactory());
  player.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));
  const computer = computerFactory("Computer", boardFactory());
  computer.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));

  player.getBoard().receiveAttack({ row: 9, col: 4 });
  computer.getBoard().receiveAttack({ row: 7, col: 2 });

  const game = gameFactory(player, computer);
  expect(game.getWinner()).toBe(null);
});
