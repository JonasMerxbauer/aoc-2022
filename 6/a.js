
const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');


let packetStart = 0;
str.split('').map((_, i) => {
    if (packetStart > 0) {
        return
    }

    let isSequence = true;
    for (let j = i; j <= i + 3; j++) {
        for (let k = i; k <= i + 3; k++) {
            if (str[j] === str[k] && j !== k) {
                isSequence = false;
            }
        }
    }

    if (isSequence) {
        packetStart = i + 4;
    }
})

console.log(packetStart)