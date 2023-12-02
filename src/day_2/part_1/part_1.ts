let input = require("./input.json");

// possible colors: red, green, blue,
// max number per color: 12 red, 13 green and 14 blue

enum COLOR {
  none = "NONE",
  red = "RED",
  green = "GREEN",
  blue = "BLUE",
}

type colorInSetType = {
  color: COLOR;
  count: number;
};

type setType = colorInSetType[];

type gameObjType = {
  game: number;
  sets: setType[];
};

type gameIsPossibleType = {
  isPossible: boolean;
  gameId: number;
};

const getColor = (s: string): COLOR => {
  switch (s) {
    case "red":
      return COLOR.red;
    case "green":
      return COLOR.green;
    case "blue":
      return COLOR.blue;
    default:
      return COLOR.none;
  }
};

const lineToObject = (line: string): gameObjType => {
  let obj: gameObjType = { game: 0, sets: [] };
  let gameAndSets: string[] = line.split(":");

  let gameId: number = Number(gameAndSets[0].split(" ")[1]);
  obj["game"] = gameId;

  let sets: setType[] = [];
  let setsString: string[] = gameAndSets[1].split(";");
  for (const element_i of setsString) {
    let set: setType = [];
    let setString: string[] = element_i.split(",");
    for (const element_j of setString) {
      let colorInSet: colorInSetType = { color: COLOR["none"], count: 0 };
      let colorInSetString: string[] = element_j.split(" ");
      colorInSet["count"] = Number(colorInSetString[1]);
      colorInSet["color"] = getColor(colorInSetString[2]);
      set.push(colorInSet);
    }
    sets.push(set);
  }
  obj["sets"] = sets;
  return obj;
};

const gameIsPossible = (gameObj: gameObjType): gameIsPossibleType => {
  let res: gameIsPossibleType = { gameId: gameObj.game, isPossible: true };
  for (const set of gameObj.sets) {
    for (const color of set) {
      if (color.color == COLOR.red && color.count > 12) {
        res.isPossible = false;
        return res;
      }
      if (color.color == COLOR.green && color.count > 13) {
        res.isPossible = false;
        return res;
      }
      if (color.color == COLOR.blue && color.count > 14) {
        res.isPossible = false;
        return res;
      }
    }
  }
  return res;
};

const sumGameIdPossible = (lines: string[]): number => {
  let sum = 0;
  for (const line of lines) {
    const obj: gameObjType = lineToObject(line);
    const isPossibleGame = gameIsPossible(obj);
    if (isPossibleGame.isPossible) {
      sum += isPossibleGame.gameId;
    }
  }
  return sum;
};

const tabTest: string[] = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
];

console.log(sumGameIdPossible(input));