const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

let start = { x: 0, y: 0 };
let end = { x: 0, y: 0 };

const aplhabet = "abcdefghijklmnopqrstuvwxyz".split("");

data.forEach((raw, i) => {
  data[i] = raw.split("").map((char, j) => {
    if (char === "S") {
      start = { x: j, y: i };
      return 1;
    }
    if (char === "E") {
      end = { x: j, y: i };
      return aplhabet.indexOf("z") + 1;
    }
    if (aplhabet.includes(char)) {
      return aplhabet.indexOf(char) + 1;
    }
    return char;
  });
});

const getPossibleMoves = (point) => {
  const possibleMoves = [];
  let pointValue = data[point.y][point.x];

  if (point.y > 0 && pointValue <= data[point.y - 1][point.x] + 1) {
    possibleMoves.push({ x: point.x, y: point.y - 1 });
  }
  if (
    point.y < data.length - 1 &&
    pointValue <= data[point.y + 1][point.x] + 1
  ) {
    possibleMoves.push({ x: point.x, y: point.y + 1 });
  }
  if (point.x > 0 && pointValue <= data[point.y][point.x - 1] + 1) {
    possibleMoves.push({ x: point.x - 1, y: point.y });
  }
  if (
    point.x < data[0].length - 1 &&
    pointValue <= data[point.y][point.x + 1] + 1
  ) {
    possibleMoves.push({ x: point.x + 1, y: point.y });
  }

  return possibleMoves;
};

let queue = [[end]];

const visited = new Set([`x:${end.x},y:${end.y}`]);

while (queue.length > 0) {
  const newPaths = [];

  queue.forEach((path) => {
    const lastPoint = path[path.length - 1];
    const possibleMoves = getPossibleMoves(lastPoint);
    possibleMoves.forEach((move) => {
      const pointValue = data[move.y][move.x];

      if (pointValue === 1) {
        console.log(path.length);
        process.exit();
      }

      let moveString = `x:${move.x},y:${move.y}`;

      if (!visited.has(moveString)) {
        const newPath = [...path];
        newPath.push(move);
        newPaths.push(newPath);
        visited.add(moveString);
        queue.push(move);
      }
    });
  });
  queue = newPaths;
}
