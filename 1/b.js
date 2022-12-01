
const b = () => {

    const fs = require('fs');

    let txtFile = "data.txt";
    let str = fs.readFileSync(txtFile,'utf8');

    let data = str.split('\r\n');

    let elves = [];


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
    currentElf = 0;


    let sortedElves = elves.sort((a, b) => b - a);
    
    console.warn(sortedElves[0] + sortedElves[1] + sortedElves[2]);

}

b();
