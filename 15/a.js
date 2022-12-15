const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

let beacons = new Set();
let sensors = new Set();

let searchedRow = 2000000;

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

let filledPaths = new Set();

positions.forEach((row) => {
  const [first, second] = row;
  const [x1, y1] = first;
  const [x2, y2] = second;

  const distance = Math.abs(x1 - x2) + Math.abs(y1 - y2);

  const corners = [x1 + distance, y1 + distance, x1 - distance, y1 - distance];

  for (let i = corners[3]; i < corners[1]; i++) {
    let distanceFromCenter = distance - Math.abs(i - y1);

    if (i === searchedRow) {
      filledPaths.add(
        `x${x1 - distanceFromCenter},x${x1 + distanceFromCenter}`
      );
    }
  }
});

let filledPoints = new Set();

filledPaths.forEach((filledPoint) => {
  const [x1, x2] = filledPoint
    .replaceAll("x", "")
    .split(",")
    .map((item) => parseInt(item));

  for (let i = x1; i <= x2; i++) {
    if (!beacons.has(`x${i},y${searchedRow}`)) {
      filledPoints.add(`x${i},y${searchedRow}`);
    }
  }
});

console.log(filledPoints.size);
