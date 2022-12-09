const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

const isVisible = (row, col) => {
  const treeHeight = trees[row][col];
  let visible = true;

  // Left
  for (let i = 0; i < col; i++) {
    if (trees[row][i] >= treeHeight) {
      visible = false;
      break;
    }
  }
  if (visible) return true;

  // Right
  visible = true;
  for (let i = trees[row].length; i > col; i--) {
    if (trees[row][i] >= treeHeight) {
      visible = false;
      break;
    }
  }
  if (visible) return true;

  // Top
  visible = true;
  for (let i = 0; i < row; i++) {
    if (trees[i][col] >= treeHeight) {
      visible = false;
      break;
    }
  }
  if (visible) return true;

  // Bottom
  visible = true;
  for (let i = trees.length - 1; i > row; i--) {
    if (trees[i][col] >= treeHeight) {
      visible = false;
      break;
    }
  }
  if (visible) return true;

  return false;
};

let trees = [];
trees = data.map((row, i) => {
  trees[i] = [];
  return (trees[i] = row.split(""));
});

let visibleTrees = 0;
trees.forEach((row, i) => {
  row.forEach((col, j) => {
    if (isVisible(i, j)) {
      visibleTrees++;
    }
  });
});

console.log(visibleTrees);
