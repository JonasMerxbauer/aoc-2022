const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

const startPoint = [500, -1];

let abbys = 0;

const getFilledRocks = (rock1, rock2) => {
  let filledRock = [];
  const [x1, y1] = rock1;
  const [x2, y2] = rock2;

  const onXAxis = x1 === x2;
  const [min, max] = onXAxis
    ? [y1, y2].sort((a, b) => a - b)
    : [x1, x2].sort((a, b) => a - b);

  for (let i = min; i <= max; i++) {
    filledRock.push([onXAxis ? x1 : i, onXAxis ? i : y1]);
  }

  return filledRock;
};

let blocks = new Set();

data.forEach((row) => {
  const newRow = row.split(" -> ").map((item) => {
    const [x, y] = item.split(",").map((item) => parseInt(item));
    if (y > abbys) {
      abbys = y;
    }
    return [x, y];
  });

  for (let i = 0; i < newRow.length - 1; i++) {
    getFilledRocks(newRow[i], newRow[i + 1])
      .map((item) => `x${item[0]},y${item[1]}`)
      .forEach(blocks.add, blocks);
  }
});

let sandCount = 0;
let isDone = false;
while (!isDone) {
  let sand = startPoint;
  let isBlocked = false;

  while (!isBlocked) {
    let [x, y] = sand;

    if (blocks.has(`x${x},y${y + 1}`)) {
      if (!blocks.has(`x${x - 1},y${y + 1}`)) {
        sand = [x - 1, y + 1];
      } else if (!blocks.has(`x${x + 1},y${y + 1}`)) {
        sand = [x + 1, y + 1];
      } else {
        sand = [x, y];
        isBlocked = true;
      }
    } else {
      sand = [x, y + 1];

      if (sand[1] > abbys) {
        isDone = true;
        break;
      }
    }
  }

  if (isDone) {
    console.log(sandCount);
  }

  sandCount++;
  blocks.add(`x${sand[0]},y${sand[1]}`);
}
