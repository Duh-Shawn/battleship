// factory function for creating ships
const shipFactory = (length) => {
  let hits = 0;
  const getHits = () => hits;
  const isSunk = () => hits === length;
  const hit = () => {
    hits += 1;
  };
  return { getHits, hit, isSunk };
};

export default shipFactory;
