import computerFactory from "../scripts/computer";

test("inherits from player", () => {
  const computer = computerFactory("Computer", null);
  expect(computer.getName()).toBe("Computer");
});

test("computer selects random coords", () => {
  const computer = computerFactory("Computer", null);
  const coords = computer.getNewAttackCoords();
  expect(coords.row).toBeGreaterThanOrEqual(0);
  expect(coords.row).toBeLessThanOrEqual(9);
  expect(coords.col).toBeGreaterThanOrEqual(0);
  expect(coords.col).toBeLessThanOrEqual(9);
});

test("computer selects unused coords", () => {
  const computer = computerFactory("Computer", null);
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (i === 9 && j === 9) break;
      computer.recordAttack({ row: i, col: j });
    }
  }
  const coords = computer.getNewAttackCoords();
  expect(coords.row).toBe(9);
  expect(coords.col).toBe(9);
});

test("computer selects unused coords 2", () => {
  const computer = computerFactory("Computer", null);
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      if (!(i === 5 && j === 2)) {
        computer.recordAttack({ row: i, col: j });
      }
    }
  }
  const coords = computer.getNewAttackCoords();
  expect(coords.row).toBe(5);
  expect(coords.col).toBe(2);
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
