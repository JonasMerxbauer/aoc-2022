
const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');

const data = str.split('\r\n');

const opponentRPS = ["A", "B", "C"]; // Rock, Paper, Scissors
const playerRPS = ["X", "Y", "Z"]; // Rock, Paper, Scissors

let sum = 0;

data.forEach((line) => {
    const lineData = line.split(' ');

    let score = playerRPS.indexOf(lineData[1]) + 1;

    if (opponentRPS.indexOf(lineData[0]) === playerRPS.indexOf(lineData[1])) {
        score += 3;
    } else if (opponentRPS.indexOf(lineData[0]) === playerRPS.indexOf(lineData[1]) + 1 || opponentRPS.indexOf(lineData[0]) === playerRPS.indexOf(lineData[1]) - 2) {
        score += 0;
    } else {
        score += 6;
    }

    sum += score;
});

console.log(sum);
