
const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');


let messageStart = 0;
str.split('').map((_, i) => {
    if (messageStart > 0) {
        return
    }

    let isSequence = true;
    for (let j = i; j <= i + 13; j++) {
        for (let k = i; k <= i + 13; k++) {
            if (str[j] === str[k] && j !== k) {
                isSequence = false;
            }
        }
    }

    if (isSequence) {
        messageStart = i + 14;
    }
})

console.log(messageStart)