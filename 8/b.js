const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

const getScenicScore = (row, col) => {
  const treeHeight = trees[row][col];

  let topScore = 0;
  let bottomScore = 0;
  let leftScore = 0;
  let rightScore = 0;

  // Left
  for (let i = col - 1; i >= 0; i--) {
    if (trees[row][i] >= treeHeight || i === 0) {
      leftScore = col - i;
      break;
    }
  }

  // Right
  for (let i = col + 1; i < trees[row].length; i++) {
    if (trees[row][i] >= treeHeight || i === trees[row].length - 1) {
      rightScore = i - col;
      break;
    }
  }

  // Top
  for (let i = row - 1; i >= 0; i--) {
    if (trees[i][col] >= treeHeight || i === 0) {
      topScore = row - i;
      break;
    }
  }

  // Bottom
  for (let i = row + 1; i < trees.length; i++) {
    if (trees[i][col] >= treeHeight || i === trees.length - 1) {
      bottomScore = i - row;
      break;
    }
  }

  return topScore * bottomScore * leftScore * rightScore;
};

let trees = [];
trees = data.map((row, i) => {
  trees[i] = [];
  return (trees[i] = row.split(""));
});

let scenicScore = 0;
trees.forEach((row, i) => {
  row.forEach((col, j) => {
    if (getScenicScore(i, j) > scenicScore) {
      scenicScore = getScenicScore(i, j);
    }
  });
});

console.log(scenicScore);
