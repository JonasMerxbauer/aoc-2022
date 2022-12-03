
const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');

const data = str.split('\r\n');

const aplhabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

let sum = 0;

data.forEach((line) => {
    const firstHalf = line.slice(0, line.length / 2)
    const secondtHalf = line.slice(line.length / 2, line.length)

    const duplicatedChars = firstHalf.split('').filter((char) => {
        return secondtHalf.includes(char);
    })

    sum += aplhabet.indexOf(duplicatedChars[0]) + 1;
});

console.log(sum);
