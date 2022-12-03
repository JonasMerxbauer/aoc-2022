// Number of attempts: 4

const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');

const items = str.split('\r\n');
const elves = {};
let currentElf = 1;

for (const item of items) {
  if (item === '') {
    // End of the current Elf's inventory, move to the next Elf
    currentElf++;
  } else {
    // Item with the given number of calories
    const calories = Number(item);

    if (!(currentElf in elves)) {
      // Start a new inventory for the Elf
      elves[currentElf] = calories;
    } else {
      // Add the item to the current Elf's inventory
      elves[currentElf] += calories;
    }
  }
}

// Find the Elf with the most calories
let maxCalories = 0;
let maxElf = null;

for (const elf in elves) {
  const calories = elves[elf];

  if (calories > maxCalories) {
    maxCalories = calories;
    maxElf = elf;
  }
}

console.log(maxElf); // Elf with the most calories
console.log(maxCalories); // Total number of calories
