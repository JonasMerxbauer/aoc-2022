const fs = require("fs");

const txtFile = "test.txt";
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

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => {
    const { items, operation, test, ifTrue, ifFalse } = monkey;

    const [operator, amount] = operation;

    items.forEach((item) => {
      item = doOperation(item, operator, amount);

      item = Math.floor(item / 3);

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
