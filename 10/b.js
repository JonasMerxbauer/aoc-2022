const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n");

let x = 1;
let cycle = 0;

let pixels = [];

let position = 0;

const printPixel = () => {
  let index = Math.floor(cycle / 40);
  if (position === 40) {
    position = 0;
  }

  if (pixels[index] === undefined) {
    pixels[index] = [];
  }

  if (x >= position - 1 && x <= position + 1) {
    pixels[index].push("#");
  } else {
    pixels[index].push(".");
  }

  position++;
  console.log(position);
};

printPixel();

data.forEach((line) => {
  const [instruction, value] = line.split(" ");

  if (instruction === "noop") {
    cycle++;
    printPixel();
  }
  if (instruction === "addx") {
    cycle++;
    printPixel();
    cycle++;
    x += parseInt(value);
    printPixel();
  }
});

pixels = pixels.map((line) => line.join("")).join("\r\n");
console.log(pixels);
