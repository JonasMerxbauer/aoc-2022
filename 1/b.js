
const b = () => {
    const fs = require('fs');

    const txtFile = "data.txt";
    const str = fs.readFileSync(txtFile,'utf8');

    const data = str.split('\r\n');

    const elves = [];
    let currentElf = 0;
    let index = 0;

    data.forEach((line, i) => {
        if (line !== '') {
            currentElf += Number(line);
        } else {
            elves[index] = currentElf;
            currentElf = 0;
            index++;
        }
    });
    
    elves[index] = currentElf;

    let sortedElves = elves.sort((a, b) => b - a);
    
    console.log(sortedElves[0] + sortedElves[1] + sortedElves[2]);
}

b();
