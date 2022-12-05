
const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');

const [unformattedStacks, unformattedSteps] = str.split('\r\n\r\n');


const stacksWithoutNumbers = unformattedStacks.split('\r\n').reverse().slice(1);

let rows = [];

// Creates a 2D array of the stacks
stacksWithoutNumbers.forEach((row, index) => {
    rows[index] = []
    for (let i = 0; i < stacksWithoutNumbers[0].length; i += 4) {
        rows[index][i/4] = row.substring(i + 1, i + 2);
    }
})


let columnsWithSpaces = []

// Converts array from rows to columns
for (let i = 0; i < rows[0].length; i++) {
    columnsWithSpaces[i] = []
    for (let j = 0; j < rows.length; j++) {
        columnsWithSpaces[i][j] = rows[j][i];
    }
}

const columns = columnsWithSpaces.map(column => column.filter(item => item !== ' '));

const steps = unformattedSteps.split('\r\n').map(step => {
   return step.split(' ').filter(item => item !== "move" && item !== "from" && item !== "to")
});

// Moves the crates from one column to another all at once
steps.forEach(step => {
    const [count, from, to] = step;
    let multipleCrates = [];
    for (let i = 0; i < count; i++) {
        const fromColumn = columns[from-1];
        const block = fromColumn.pop();
        multipleCrates.push(block);
    }

    multipleCrates = multipleCrates.reverse();

    for (let i = 0; i < count; i++) {
        const toColumn = columns[to-1];
        toColumn.push(multipleCrates[i]);
    }
})

console.log(columns.map(column => column[column.length - 1]).join(''))