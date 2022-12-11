const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

let x = 1;
let cycle = 1;
let strengths = [];

const checkCycle = () => {
  if (
    cycle === 20 ||
    cycle === 60 ||
    cycle === 100 ||
    cycle === 140 ||
    cycle === 180 ||
    cycle === 220
  ) {
    strengths.push(x * cycle);
  }
};

data.forEach((line) => {
  const [instruction, value] = line.split(" ");

  if (instruction === "noop") {
    cycle++;
    checkCycle();
  }
  if (instruction === "addx") {
    cycle++;
    checkCycle();
    cycle++;
    x += parseInt(value);
    checkCycle();
  }
});

const sum = strengths.reduce((a, b) => a + b, 0);

console.log(sum);
