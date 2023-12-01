let { fileToJsonFile } = require("../../util/readfile");

fileToJsonFile('./input.txt', './input.json');

let input = require('./input.json');