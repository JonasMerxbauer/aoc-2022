
const fs = require('fs');


const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');

const data = str.split('\r\n');

const elves = [];
let currentElf = 0;
let index = 0;

data.forEach((line) => {
    if (line !== '') {
        currentElf += Number(line);
    } else {
        elves[index] = currentElf;
        currentElf = 0;
        index++;
    }
});

elves[index] = currentElf;

const sortedElves = elves.sort((first, second) => second - first);

console.log(sortedElves.length)
console.log(sortedElves[0]);
