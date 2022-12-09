const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };

let tailPositions = new Set();
data.forEach((line) => {
  const [direction, distance] = line.split(" ");

  for (let i = 0; i < distance; i++) {
    if (direction === "R") {
      head.x++;
    } else if (direction === "L") {
      head.x--;
    } else if (direction === "U") {
      head.y++;
    } else if (direction === "D") {
      head.y--;
    }

    const xDiff = Math.abs(head.x - tail.x);
    const yDiff = Math.abs(head.y - tail.y);

    if ((xDiff === 2 && yDiff === 1) || (xDiff === 1 && yDiff === 2)) {
      tail.x += head.x > tail.x ? 1 : -1;
      tail.y += head.y > tail.y ? 1 : -1;
    } else if (xDiff === 2) {
      tail.x += head.x > tail.x ? 1 : -1;
    } else if (yDiff === 2) {
      tail.y += head.y > tail.y ? 1 : -1;
    }

    tailPositions.add(`${tail.x},${tail.y}`);
  }
});

console.log(tailPositions.size);
