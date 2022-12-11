const fs = require("fs");

const txtFile = "data.txt";
const str = fs.readFileSync(txtFile, "utf8");

const monkeysUnformatted = str.split("\r\n\r\n");

const doOperation = (old, operator, amount) => {
  if (amount === "old") {
    amount = old;
  } else {
    amount = parseInt(amount);
  }

  switch (operator) {
    case "+":
      return old + amount;
    case "-":
      return old - amount;
    case "*":
      return old * amount;
    case "%":
      return old % amount;
    default:
      throw new Error("Invalid operator");
  }
};

const monkeys = monkeysUnformatted.map((monkey) => {
  const [
    ,
    itemsUnformatted,
    operationUnformatted,
    testUnformatted,
    ifTrueUnformatted,
    ifFalseUnformatted,
  ] = monkey.split("\r\n");
  const items = itemsUnformatted
    .split(": ")[1]
    .split(", ")
    .map((item) => parseInt(item));
  const operation = operationUnformatted.split("new = old ")[1].split(" ");
  const test = testUnformatted.replace("  Test: divisible by ", "");
  const ifTrue = ifTrueUnformatted.replace("    If true: throw to monkey ", "");
  const ifFalse = ifFalseUnformatted.replace(
    "    If false: throw to monkey ",
    ""
  );

  return {
    items,
    operation,
    test,
    ifTrue,
    ifFalse,
    inspectedItems: 0,
  };
});

const modulo = monkeys
  .map((monkey) => monkey.test)
  .reduce((dividerA, dividerB) => dividerA * dividerB, 1);

for (let i = 0; i < 10000; i++) {
  if (i === 10000) {
    break;
  }
  monkeys.forEach((monkey, i) => {
    const { items, operation, test, ifTrue, ifFalse } = monkey;

    const [operator, amount] = operation;

    items.forEach((item) => {
      item = item % modulo;
      item = doOperation(item, operator, amount);

      if (doOperation(item, "%", test) === 0) {
        monkeys[ifTrue].items.push(item);
      } else {
        monkeys[ifFalse].items.push(item);
      }
    });

    monkey.inspectedItems += items.length;
    monkey.items = [];
  });
}

const sortedMonkeys = monkeys.sort(
  (first, second) => second.inspectedItems - first.inspectedItems
);

console.log(sortedMonkeys[0].inspectedItems * sortedMonkeys[1].inspectedItems);
