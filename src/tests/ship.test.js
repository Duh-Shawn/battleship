import shipFactory from "../scripts/ship";

test("has been hit", () => {
  const ship = shipFactory(4);
  ship.hit();
  expect(ship.getHits()).toBe(1);
});

test("has been sunk", () => {
  const ship = shipFactory(4);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});

test("get ship length", () => {
  const ship = shipFactory(4);
  expect(ship.getLength()).toBe(4);
});
