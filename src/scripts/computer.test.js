import computerFactory from "./computer";

test("inherits from player", () => {
  const computer = computerFactory("Computer", null);
  expect(computer.getName()).toBe("Computer");
});

test("computer selects random coords", () => {
  const computer = computerFactory("Computer", null);
  const coords = computer.selectCoords();
  expect(coords.row).toBeGreaterThanOrEqual(0);
  expect(coords.row).toBeLessThanOrEqual(9);
  expect(coords.col).toBeGreaterThanOrEqual(0);
  expect(coords.col).toBeLessThanOrEqual(9);
});

test("coords recorded", () => {
  const computer = computerFactory("Computer", null);
  computer.recordAttack({ row: 1, col: 2 });
  const attackList = computer.getAttackList();
  expect(attackList[0]).toEqual({ row: 1, col: 2 });
});

test("Coords have not been attacked previously", () => {
  const computer = computerFactory("Computer", null);
  computer.recordAttack({ row: 1, col: 2 });
  computer.recordAttack({ row: 8, col: 9 });
  expect(computer.hasAttackedCoords({ row: 4, col: 9 })).toBeFalsy();
});

test("Coords have been attacked previously", () => {
  const computer = computerFactory("Computer", null);
  computer.recordAttack({ row: 1, col: 2 });
  computer.recordAttack({ row: 8, col: 9 });
  expect(computer.hasAttackedCoords({ row: 8, col: 9 })).toBeTruthy();
});
