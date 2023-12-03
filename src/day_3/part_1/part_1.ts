let input = require("./input.json");

const generateLine = (character: string, len: number) => {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += character;
  }
  return s;
};

const isSymbol = (c: string): boolean => {
  if (c == null || c == undefined) return false;
  if (!isNaN(Number(c)) || c == ".") return false;
  return true;
};

const isLineContainSymbol = (
  str: string,
  startIndex: number,
  endIndex: number
) => {
  for (let i = startIndex; i <= endIndex; i++) {
    if (isSymbol(str[i])) return true;
  }
  return false;
};

const lastIndexNumber = (str: string, start: number) => {
  let i = start;
  while (!isNaN(Number(str[i + 1])) && i < str.length - 1) i++;
  return i;
};

const partNumberInLine = (
  lineTop: string | null,
  line: string,
  lineBottom: string | null
): number => {
  let sum = 0;
  if (lineTop == null) lineTop = generateLine(".", line.length);
  if (lineBottom == null) lineBottom = generateLine(".", line.length);

  let i = 0;
  while (i < line.length) {
    if (!isNaN(Number(line[i]))) {
      let lastIndex = lastIndexNumber(line, i);
      if (
        (i != 0 && isSymbol(line[i - 1])) ||
        (lastIndex + 1 <= line.length - 1 && isSymbol(line[lastIndex + 1]))
      ) {
        sum += Number(line.slice(i, lastIndex + 1));
      } else {
        let startIndex: number = i - 1 < 0 ? i : i - 1;
        let endIndex: number =
          lastIndex + 1 <= line.length - 1 ? lastIndex + 1 : lastIndex;
        if (
          isLineContainSymbol(lineTop, startIndex, endIndex) ||
          isLineContainSymbol(lineBottom, startIndex, endIndex)
        ) {
          sum += Number(line.slice(i, lastIndex + 1));
        }
      }
      i = lastIndex + 1;
    } else {
      i++;
    }
  }
  return sum;
};

const sumPartNumberEngineSchematic = (lines: string[]): number => {
  let sum: number = 0;

  for (let i = 0; i < lines.length; i++) {
    if (i == 0) sum += partNumberInLine(null, lines[i], lines[i + 1]);
    else if (i == lines.length - 1)
      sum += partNumberInLine(lines[i - 1], lines[i], null);
    else sum += partNumberInLine(lines[i - 1], lines[i], lines[i + 1]);
  }
  return sum;
};

console.log(sumPartNumberEngineSchematic(input));
