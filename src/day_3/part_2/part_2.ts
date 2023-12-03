let input = require("./input.json");

const generateLine = (character: string, len: number) => {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += character;
  }
  return s;
};

const findFirstIndexNumber = (str: string, end: number) => {
  let i = end;
  while (!isNaN(Number(str[i - 1])) && i > 0) i--;
  return i;
};

const findLastIndexNumber = (str: string, start: number) => {
  let i = start;
  while (!isNaN(Number(str[i + 1])) && i < str.length - 1) i++;
  return i;
};

const oneGearRatio = (
  lineTop: string,
  line: string,
  lineBottom: string,
  index: number
): number => {
  let num: number[] = [];
  if (index > 0 && !isNaN(Number(line[index - 1]))) {
    // GAUCHE
    let firstIndex = findFirstIndexNumber(line, index - 1);
    num.push(Number(line.slice(firstIndex, index)));
  }
  if (index < line.length - 1 && !isNaN(Number(line[index + 1]))) {
    // DROITE
    let lastIndex = findLastIndexNumber(line, index + 1);
    num.push(Number(line.slice(index + 1, lastIndex + 1)));
  }
  if (!isNaN(Number(lineTop[index]))) {
    // HAUT
    let firstIndex = findFirstIndexNumber(lineTop, index);
    let lastIndex = findLastIndexNumber(lineTop, firstIndex);
    num.push(Number(lineTop.slice(firstIndex, lastIndex + 1)));
  }
  if (!isNaN(Number(lineBottom[index]))) {
    // BAS
    let firstIndex = findFirstIndexNumber(lineBottom, index);
    let lastIndex = findLastIndexNumber(lineBottom, firstIndex);
    num.push(Number(lineBottom.slice(firstIndex, lastIndex + 1)));
  }
  if (
    index > 0 &&
    !isNaN(Number(lineTop[index - 1])) &&
    isNaN(Number(lineTop[index]))
  ) {
    // HAUT-GAUCHE
    let firstIndex = findFirstIndexNumber(lineTop, index - 1);
    num.push(Number(lineTop.slice(firstIndex, index)));
  }
  if (
    index < line.length - 1 &&
    !isNaN(Number(lineTop[index + 1])) &&
    isNaN(Number(lineTop[index]))
  ) {
    // HAUT-DROITE
    let lastIndex = findLastIndexNumber(lineTop, index + 1);
    num.push(Number(lineTop.slice(index + 1, lastIndex + 1)));
  }
  if (
    index > 0 &&
    !isNaN(Number(lineBottom[index - 1])) &&
    isNaN(Number(lineBottom[index]))
  ) {
    // BAS-GAUCHE
    let firstIndex = findFirstIndexNumber(lineBottom, index - 1);
    num.push(Number(lineBottom.slice(firstIndex, index)));
  }
  if (
    index < line.length - 1 &&
    !isNaN(Number(lineBottom[index + 1])) &&
    isNaN(Number(lineBottom[index]))
  ) {
    // BAS-DROITE
    let lastIndex = findLastIndexNumber(lineBottom, index + 1);
    num.push(Number(lineBottom.slice(index + 1, lastIndex + 1)));
  }
  if (num.length > 1) {
    return num.reduce((a, b) => a * b);
  }
  return 0;
};

const gearRatiosInLine = (
  lineTop: string | null,
  line: string,
  lineBottom: string | null
): number => {
  let sum = 0;
  if (lineTop == null) lineTop = generateLine(".", line.length);
  if (lineBottom == null) lineBottom = generateLine(".", line.length);

  let i = 0;
  while (i < line.length) {
    if (line[i] == "*") {
      sum += oneGearRatio(lineTop, line, lineBottom, i);
    }
    i++;
  }
  return sum;
};

const sumgearRatiosEngineSchematic = (lines: string[]): number => {
  let sum: number = 0;

  for (let i = 0; i < lines.length; i++) {
    if (i == 0) sum += gearRatiosInLine(null, lines[i], lines[i + 1]);
    else if (i == lines.length - 1)
      sum += gearRatiosInLine(lines[i - 1], lines[i], null);
    else sum += gearRatiosInLine(lines[i - 1], lines[i], lines[i + 1]);
  }
  return sum;
};

console.log(sumgearRatiosEngineSchematic(input));
