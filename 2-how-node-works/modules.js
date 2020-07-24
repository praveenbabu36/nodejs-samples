// console.log(arguments);
// console.log(require("module").wrapper);

//module exports
const Calc = require("./calc-module");
const calc = new Calc();

console.log(calc.add(2, 3));
console.log(calc.substract(4, 3));
console.log("-------------------------------------");
// exports
const calc2 = require("./calc-module2");
console.log(calc2.add(2, 3));
console.log(calc2.substract(4, 3));
console.log("-------------------------------------");
// es6 destructuring
const { add, substract } = require("./calc-module2");
console.log(add(2, 3));
console.log(substract(4, 3));
