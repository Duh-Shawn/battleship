import gameFactory from "../scripts/game";
import playerFactory from "../scripts/player";
import boardFactory from "../scripts/board";
import computerFactory from "../scripts/computer";
import shipFactory from "../scripts/ship";

test("test computer selected coords are NOT unique - vertically starting on existing line", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(4);
  const game = gameFactory(player, computer);
  const orientation = 1;
  const coords = { row: 1, col: 1 };
  const array = [...Array(10)].map(() => Array(10).fill("empty"));
  array[1][1] = ship;
  array[2][1] = ship;
  array[3][1] = ship;
  array[4][1] = ship;
  expect(
    game.areComputerSelectedCoordsUnique(
      array,
      coords,
      1,
      ship.getLength()
    )
  ).toBeFalsy();
});

test("test computer selected coords are NOT unique - vertically starting on existing spot", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(4);
  const game = gameFactory(player, computer);
  const orientation = 1;
  const coords = { row: 4, col: 1 };
  const array = [...Array(10)].map(() => Array(10).fill("empty"));
  array[1][1] = ship;
  array[2][1] = ship;
  array[3][1] = ship;
  array[4][1] = ship;
  expect(
    game.areComputerSelectedCoordsUnique(
      array,
      coords,
      1,
      ship.getLength()
    )
  ).toBeFalsy();
});

test("test computer selected coords are NOT unique - vertically", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(4);
  const game = gameFactory(player, computer);
  const orientation = 1;
  const coords = { row: 0, col: 1 };
  const array = [...Array(10)].map(() => Array(10).fill("empty"));
  array[1][0] = ship;
  array[1][1] = ship;
  array[1][2] = ship;
  array[1][3] = ship;
  expect(
    game.areComputerSelectedCoordsUnique(
      array,
      coords,
      orientation,
      ship.getLength()
    )
  ).toBeFalsy();
});

test("test computer selected coords are unique - vertically", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 1;
  const coords = { row: 0, col: 0 };
  const array = [...Array(10)].map(() => Array(10).fill("empty"));
  const shipLength = 4;
  expect(
    game.areComputerSelectedCoordsUnique(array, coords, orientation, shipLength)
  ).toBeTruthy();
});

test("test computer selected coords are NOT unique - horizontally starting on existing line", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(4);
  const game = gameFactory(player, computer);
  const orientation = 0;
  const coords = { row: 1, col: 1 };
  const array = [...Array(10)].map(() => Array(10).fill("empty"));
  array[1][1] = ship;
  array[1][2] = ship;
  array[1][3] = ship;
  array[1][4] = ship;
  expect(
    game.areComputerSelectedCoordsUnique(
      array,
      coords,
      orientation,
      ship.getLength()
    )
  ).toBeFalsy();
});

test("test computer selected coords are NOT unique - horizontally starting on existing spot", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(4);
  const game = gameFactory(player, computer);
  const orientation = 0;
  const coords = { row: 4, col: 1 };
  const array = [...Array(10)].map(() => Array(10).fill("empty"));
  array[1][1] = ship;
  array[2][1] = ship;
  array[3][1] = ship;
  array[4][1] = ship;
  expect(
    game.areComputerSelectedCoordsUnique(
      array,
      coords,
      orientation,
      ship.getLength()
    )
  ).toBeFalsy();
});

test("test computer selected coords are NOT unique - horizontally", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(4);
  const game = gameFactory(player, computer);
  const orientation = 0;
  const coords = { row: 2, col: 0 };
  const array = [...Array(10)].map(() => Array(10).fill("empty"));
  array[1][1] = ship;
  array[2][1] = ship;
  array[3][1] = ship;
  array[4][1] = ship;
  expect(
    game.areComputerSelectedCoordsUnique(
      array,
      coords,
      orientation,
      ship.getLength()
    )
  ).toBeFalsy();
});

test("test computer selected coords are unique - horizontally", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 0;
  const coords = { row: 0, col: 0 };
  const array = [...Array(10)].map(() => Array(10).fill("empty"));
  const shipLength = 4;
  expect(
    game.areComputerSelectedCoordsUnique(array, coords, orientation, shipLength)
  ).toBeTruthy();
});

test("test out of bounds coords - horizontally", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 0; // horizontal placement
  expect(
    game.areComputerSelectedCoordsInbounds(
      { row: 1, col: 6 },
      orientation,
      ship.getLength()
    )
  ).toBeFalsy();
});

test("test out of bounds coords - vertically", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(5);
  const game = gameFactory(player, computer);
  const orientation = 1; // horizontal placement
  expect(
    game.areComputerSelectedCoordsInbounds(
      { row: 6, col: 6 },
      orientation,
      ship.getLength()
    )
  ).toBeFalsy();
});

test("test inbounds coords - horizontally", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(4);
  const game = gameFactory(player, computer);
  const orientation = 0; // horizontal placement
  expect(
    game.areComputerSelectedCoordsInbounds(
      { row: 1, col: 6 },
      orientation,
      ship.getLength()
    )
  ).toBeTruthy();
});

test("test inbounds coords - vertically", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const ship = shipFactory(4);
  const game = gameFactory(player, computer);
  const orientation = 1; // horizontal placement
  expect(
    game.areComputerSelectedCoordsInbounds(
      { row: 6, col: 6 },
      orientation,
      ship.getLength()
    )
  ).toBeTruthy();
});

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
