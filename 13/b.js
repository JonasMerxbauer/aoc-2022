const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.replaceAll("\r\n\r\n", "\r\n").split("\r\n");

const createArray = (value) => {
  return [value];
};

const compareValues = (first, second) => {
  if (Array.isArray(first) && Array.isArray(second)) {
    for (let i = 0; i < first.length && i < second.length; i++) {
      if (compareValues(first[i], second[i]) != null) {
        return compareValues(first[i], second[i]);
      }
    }
    if (first.length < second.length) {
      return true;
    }
    if (first.length > second.length) {
      return false;
    }
    return null;
  }
  if (typeof first === "number" && typeof second === "number") {
    if (second > first) {
      return true;
    }
    if (second < first) {
      return false;
    }
    return null;
  }
  if (Array.isArray(first) && typeof second === "number") {
    return compareValues(first, createArray(second));
  } else if (typeof first === "number" && Array.isArray(second)) {
    return compareValues(createArray(first), second);
  }
};

for (let i = 1; i < data.length; i++) {
  for (let j = 0; j < data.length - i; j++) {
    const first = JSON.parse(data[j]);
    const second = JSON.parse(data[j + 1]);
    if (!compareValues(first, second)) {
      [data[j], data[j + 1]] = [data[j + 1], data[j]];
    }
  }
}

console.log((data.indexOf("[[2]]") + 1) * (data.indexOf("[[6]]") + 1));
