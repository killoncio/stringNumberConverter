// you can run this file in node to see they pass with the scenarios I tried
const stringToNumber = require('./stringToNumber.js');
const numberToString = require('./numberToString.js');

console.log(stringToNumber.convert('three thousand two hundred thirty five','EN') === 3235);
console.log(stringToNumber.convert("thirty three thousand two hundred thirty five", 'EN') === 33235);
console.log(stringToNumber.convert("three hundred thirty five", 'EN') === 335);
console.log(stringToNumber.convert("thirty five", 'EN') === 35);
console.log(stringToNumber.convert("five", 'EN') === 5);
// console.log(stringToNumber.convert("Honderddrieënveertigduizend tweehonderdvijfendertig", "NL"));


console.log(numberToString.convert(123, 'EN') === 'one hundred twentythree');
console.log(numberToString.convert(1232, 'EN') === 'one thousand two hundred thirtytwo');
console.log(numberToString.convert(12329, 'EN') === 'twelve thousand three hundred twentynine');
console.log(numberToString.convert(312329, 'EN') === 'three hundred twelve thousand three hundred twentynine');