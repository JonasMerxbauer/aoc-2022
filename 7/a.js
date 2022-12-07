
const fs = require('fs');

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile,'utf8');

const data = str.split('\r\n');

let directories = {};
let currentDirectory = {};

data.map((d) => {
    if (d.startsWith('$ cd ')) {
        let dir = d.replace('$ cd ', '');
        if (dir === '..') {
            if (currentDirectory.childrenDirectories.size > 0) {
                currentDirectory.childrenDirectories.forEach((d) => {
                    currentDirectory.size += directories[currentDirectory.path + "/" + d].size;
                });
            }
            directories[currentDirectory.path] = currentDirectory;
            currentDirectory = directories[currentDirectory.parentPath];
        } else {
            currentDirectory = {
                name: dir,
                parent: currentDirectory.name ? currentDirectory.name : "",
                parentPath: currentDirectory.path ? currentDirectory.path : "",
                path: currentDirectory.path ? currentDirectory.path + "/" + dir : dir,
                size: 0,
                childrenDirectories: new Set(),
                childrenFiles: new Set()
            }
            directories[currentDirectory.path] = currentDirectory;
        }
        return;
    }

    if (d.startsWith('$ ls')) {
        return;
    }

    if (d.startsWith("dir ")) {
        let dir = d.replace('dir ', '');
        currentDirectory.childrenDirectories.add(dir);
        return;
    }

    let file = d.split(' ')
    currentDirectory.size += parseInt(file[0]);
    currentDirectory.childrenFiles.add(file[1]);
});

// Get back to root and update the size remaining directories
while (currentDirectory.name !== "") {
    if (currentDirectory.childrenDirectories.size > 0) {
        currentDirectory.childrenDirectories.forEach((d) => {
            currentDirectory.size += directories[currentDirectory.path + "/" + d].size;
        });
    }
    directories[currentDirectory.path] = currentDirectory;
    if (currentDirectory.parentPath === "") {
        break;
    }
    currentDirectory = directories[currentDirectory.parentPath];
}

let totalSize = 0;
Object.keys(directories).forEach((d) => {
    if (directories[d].size <= 100000) {
        totalSize += directories[d].size;
    }
});

console.log(totalSize);