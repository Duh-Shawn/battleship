import playerFactory from "./player";
import boardFactory from "./board";

test("get player's name", () => {
    const gameBoard = boardFactory();
    const player = playerFactory("De'Shawn", gameBoard);
    expect(player.getName()).toBe("De'Shawn");
  });
  

test("get player's board", () => {
    const gameBoard = boardFactory();
    const player = playerFactory("De'Shawn", gameBoard);
    expect(player.getBoard()).toBe(gameBoard);
  });
  