const rules = {
  ships: [
    { name: "CARRIER", length: 5 },
    { name: "BATTLESHIP", length: 4 },
    { name: "CRUISER", length: 3 },
    { name: "SUBMARINE", length: 3 },
    { name: "DESTROYER", length: 2 },
  ],
};

const getRules = () => rules;

export default getRules;
