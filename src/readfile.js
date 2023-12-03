const fs = require('fs');

const readFileToStringArray = (fileName) => {
  const data = fs.readFileSync(fileName, 'utf8');
  const lines = data.split('\n');
  return lines;
}

const arrayToJsonFile = (array, fileNameOutput) => {
  const content = JSON.stringify(array);
  fs.writeFileSync(fileNameOutput, content, 'utf8');
  console.log("SUCCES");
}

const fileToJsonFile = (input, output) => {
  const stringArray = readFileToStringArray(input);
  arrayToJsonFile(stringArray, output);
}

fileToJsonFile('./day_3/part_1/input.txt','./day_3/part_1/input.json');