
const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');

const data = str.split('\r\n');

const opponentRPS = ["A", "B", "C"]; // Rock, Paper, Scissors
const playerLDW = ["X", "Y", "Z"]; // Lose, Draw, Win

let sum = 0;

data.forEach((line) => {
    const lineData = line.split(' ');

    let score = playerLDW.indexOf(lineData[1]) * 3;

    switch (playerLDW.indexOf(lineData[1])) {
        case 0: score += ((opponentRPS.indexOf(lineData[0]) - 1) === -1) ? 3 : opponentRPS.indexOf(lineData[0]); break;
        case 1: score += opponentRPS.indexOf(lineData[0]) + 1; break;
        case 2: score += ((opponentRPS.indexOf(lineData[0]) + 1) === 3) ? 1 : opponentRPS.indexOf(lineData[0]) + 2; break
    }

    sum += score;
});

console.log(sum);
