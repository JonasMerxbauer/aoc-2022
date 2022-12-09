const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

let knots = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

let tailPositions = new Set();
data.forEach((line) => {
  const [direction, distance] = line.split(" ");

  for (let i = 0; i < distance; i++) {
    if (direction === "R") {
      knots[0].x++;
    } else if (direction === "L") {
      knots[0].x--;
    } else if (direction === "U") {
      knots[0].y++;
    } else if (direction === "D") {
      knots[0].y--;
    }

    for (let j = 1; j < knots.length; j++) {
      let xDiff = Math.abs(knots[j - 1].x - knots[j].x);
      let yDiff = Math.abs(knots[j - 1].y - knots[j].y);

      if (
        (xDiff === 2 && yDiff === 1) ||
        (xDiff === 1 && yDiff === 2) ||
        (xDiff === 2 && yDiff === 2) // Had to add this condition to allow the knots follow in diagonal a knot that moved in diagonal
      ) {
        knots[j].x += knots[j - 1].x > knots[j].x ? 1 : -1;
        knots[j].y += knots[j - 1].y > knots[j].y ? 1 : -1;
      } else if (xDiff === 2) {
        knots[j].x += knots[j - 1].x > knots[j].x ? 1 : -1;
      } else if (yDiff === 2) {
        knots[j].y += knots[j - 1].y > knots[j].y ? 1 : -1;
      }
    }

    tailPositions.add(
      `${knots[knots.length - 1].x},${knots[knots.length - 1].y}`
    );
  }
});

console.log(tailPositions.size);
