let input = require("./input.json");

const letterToNumber = (letter: string): string => {
  let l: string[] = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  for (let i = 0; i < l.length; i++) {
    if (l[i] == letter) {
      return `${i + 1}`;
    }
  }
  return `0`;
};

const indexNumberAlpha = (letter: string): [string, number] | null => {
  let l: string[] = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  if (l.indexOf(letter) >= 0) {
    return [letter, 0];
  }
  for (let i = 0; i < letter.length; i++) {
    let letterSlice = letter.slice(0, i);
    for (const element of l) {
      if (letterSlice.indexOf(element) >= 0) {
        return [element, letterSlice.indexOf(element)];
      }
    }
  }
  return null;
};

const findCalibrationOneLine = (line: string): number => {
  let first: string = "";

  for (let i = 0; i < line.length; i++) {
    if (isNaN(Number(line[i]))) {
      let valueIndex: [string, number] | null = indexNumberAlpha(line);
      if (valueIndex != null && valueIndex[1] == i) {
        first = letterToNumber(valueIndex[0]);
        break;
      }
    } else {
      first = line[i];
      break;
    }
  }
  let last: string = "";
  for (let i = line.length - 1; i >= line.indexOf(first); i--) {
    if (isNaN(Number(line[i]))) {
      let lineSlice = line.slice(i);
      let valueIndex: [string, number] | null = indexNumberAlpha(lineSlice);
      if (valueIndex != null && valueIndex[1] == 0) {
        last = letterToNumber(valueIndex[0]);
        break;
      }
    } else {
      last = line[i];
      break;
    }
  }
  return Number(first + last);
};

const findCalibration = (tab: string[]): number => {
  let acc = 0;
  for (const element of tab) {
    acc += findCalibrationOneLine(element);
  }
  return acc;
};

console.log(findCalibration(input));