// factory function for creating ships
const shipFactory = (length) => {
  const getLength = () => length;
  let hits = 0;
  const getHits = () => hits;
  const isSunk = () => hits === length;
  const hit = () => {
    hits += 1;
  };
  return { getHits, hit, isSunk, getLength };
};

export default shipFactory;
