const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

let beacons = new Set();
let sensors = new Set();

const maxX = 4000000;
const minX = 0;
const maxY = 4000000;
const minY = 0;

const positions = data.map((row) => {
  const [first, second] = row.split(": ").map((half) => {
    return half
      .substring(half.indexOf("x"))
      .replace("x=", "")
      .replace("y=", "")
      .split(", ")
      .map((item) => parseInt(item));
  });
  sensors.add(`x${first[0]},y${first[1]}`);
  beacons.add(`x${second[0]},y${second[1]}`);
  return [first, second];
});

let filledPaths = [];

positions.forEach((row) => {
  const [first, second] = row;
  const [x1, y1] = first;
  const [x2, y2] = second;

  const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);

  const corners = [x1 + distance, y1 + distance, x1 - distance, y1 - distance];

  for (let i = corners[3]; i < corners[1]; i++) {
    if (i >= minY && i <= maxY) {
      let distanceFromCenter = distance - Math.abs(i - y1);

      const newXStart =
        x1 - distanceFromCenter < minX ? minX - 1 : x1 - distanceFromCenter;
      const newXEnd =
        x1 + distanceFromCenter > maxX ? maxX + 1 : x1 + distanceFromCenter;

      if (!filledPaths[i]) {
        filledPaths[i] = [];
      }

      filledPaths[i].push([newXStart, newXEnd]);
    }
  }
});

for (let i = 0; i <= filledPaths.length; i++) {
  if (filledPaths[i]) {
    filledPaths[i].sort((a, b) => a[0] - b[0]);
    let merged = [filledPaths[i][0]];
    for (let j = 1; j < filledPaths[i].length; j++) {
      if (filledPaths[i][j][0] <= merged[merged.length - 1][1]) {
        merged[merged.length - 1][1] = Math.max(
          merged[merged.length - 1][1],
          filledPaths[i][j][1]
        );
      } else {
        merged.push(filledPaths[i][j]);
      }
    }
    filledPaths[i] = merged;
  }
}

let result = filledPaths
  .map((row, i) => {
    row.push(i);
    return row;
  })
  .filter((item) => {
    return item.length > 2;
  })[0];

console.log(result[0][1] * 4000000 + result[2]);
