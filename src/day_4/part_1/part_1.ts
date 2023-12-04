const input = require('./input.json');

type listsType = { winingsNumbers: string[]; myListNumbers: string[] };

const getNumberList = (line: string): listsType => {
  let list: listsType = {
    winingsNumbers: [],
    myListNumbers: [],
  };
  let div1 = line.split(":")[1];
  let div2 = div1.split("|");
  list.winingsNumbers = div2[0]
    .split(" ")
    .map((v) => v.trim())
    .filter((v) => v != "");
  list.myListNumbers = div2[1]
    .split(" ")
    .map((v) => v.trim())
    .filter((v) => v != "");
  return list;
};

const totalPointInOneLine = (line: string): number => {
  let sum: number = 0;
  let list: listsType = getNumberList(line);

  for (const myNumber of list.myListNumbers) {
    let verifyMyNumber: boolean = list.winingsNumbers.includes(myNumber);
    if (verifyMyNumber && sum == 0) sum = 1;
    else if (verifyMyNumber && sum > 0) sum *= 2;
  }
  return sum;
};

const totalPoint = (lines: string[]): number => {
  let sum: number = 0;

  for (const line of lines) {
    sum += totalPointInOneLine(line);
  }
  return sum;
};

console.log(totalPoint(input));