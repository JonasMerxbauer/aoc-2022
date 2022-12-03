
const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');

const data = str.split('\r\n');

const aplhabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

let sum = 0;

for (let i = 0; i < data.length; i += 3) {
    const badge = data[i].split('').filter((char) => {
        return data[i+1].includes(char) && data[i+2].includes(char);
    });
    sum += aplhabet.indexOf(badge[0]) + 1;
}

console.log(sum);