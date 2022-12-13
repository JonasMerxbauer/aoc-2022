const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const data = str.split("\r\n\r\n");

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

const results = data.map((pair) => {
  const [first, second] = pair.split("\r\n").map((str) => JSON.parse(str));

  return compareValues(first, second);
});

const sum = results.reduce((acc, curr, i) => {
  if (curr === true) {
    return (acc += i + 1);
  }
  return acc;
}, 0);

console.log(sum);
