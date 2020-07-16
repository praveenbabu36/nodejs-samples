const fs = require('fs'); // file system module
const path = require('path');

/******************************************
 * Blocking, Synchronous Way 
 ****/

//construct path
var filePath = path.join(__dirname, '..', '1-node-farm', 'txt');

// to read file
const textIn = fs.readFileSync(`${filePath}\\input.txt`,'utf-8');

console.log(textIn);

// text to write out
const textOut = `About avocado: ${textIn}.\n Created on : ${Date.now()}`;

// to write it in a file 
fs.writeFileSync(`${filePath}\\output.txt`, textOut);
console.log('File Written !');


/******************************************
 * Non-Blocking, Asynchronous Way 
 ****/
