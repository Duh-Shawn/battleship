import gameFactory from "../scripts/game";
import playerFactory from "../scripts/player";
import boardFactory from "../scripts/board";
import computerFactory from "../scripts/computer";
import shipFactory from "../scripts/ship";

test("game is not over - a player's board is empty", () => {
  const player = playerFactory("Player", boardFactory());
  const computer = computerFactory("Computer", boardFactory());
  const game = gameFactory(player, computer);
  expect(() => game.isGameOver()).toThrow("Unable to determine game status - a player is using an empty gameboard");
});

test("game is not over - in progress", () => {
  const player = playerFactory("Player", boardFactory());
  player.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));
  const computer = computerFactory("Computer", boardFactory());
  computer.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));
  const game = gameFactory(player, computer);

  computer.getBoard().receiveAttack({ row: 1, col: 5 });

  expect(game.isGameOver()).toBeFalsy();
});

test("game is over - computer is sunk", () => {
  const player = playerFactory("Player", boardFactory());
  player.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));
  const computer = computerFactory("Computer", boardFactory());
  computer.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));

  computer.getBoard().receiveAttack({ row: 1, col: 2 });

  const game = gameFactory(player, computer);
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
  player.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));
  const computer = computerFactory("Computer", boardFactory());
  computer.getBoard().placeShip({ row: 1, col: 2 }, shipFactory(1));

  player.getBoard().receiveAttack({ row: 1, col: 4 });
  computer.getBoard().receiveAttack({ row: 1, col: 2 });

  const game = gameFactory(player, computer);
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
