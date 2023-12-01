let { fileToJsonFile } = require("../../util/readfile");

fileToJsonFile('./input.txt', './input.json');

let input = require('./input.json');

const findCalibrationOneLine = (line: string): number => {
  let first: string = "";
  for (const element of line) {
    if (!isNaN(Number(element))) {
      first = element;
      break;
    }
  }
  let last: string = "";
  for (let i = line.length; i >= line.indexOf(first); i--) {
    if (!isNaN(Number(line[i]))) {
      last = line[i];
      break;
    }
  }
  return Number(first + last);
}

const findCalibration = (tab: string[]): number => {
  let acc = 0
  for (const element of tab) {
    acc+= findCalibrationOneLine(element);
  }
  return acc;
}

console.log(findCalibration(input));
