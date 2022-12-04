
const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');

const data = str.split('\r\n');

let counter = 0;

data.forEach((line) => {
    const [first, second] = line.split(',');
    let [firstStart, firstEnd] = first.split('-').map((num) => Number(num));
    let [secondStart, secondEnd] = second.split('-').map((num) => Number(num));

    if (((firstStart >= secondStart) && (firstEnd <= secondEnd)) || ((secondStart >= firstStart) && (secondEnd <= firstEnd))) {
        counter++;
    }
});

console.log(counter);