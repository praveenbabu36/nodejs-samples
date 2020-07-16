const fs = require('fs'); // file system module
const path = require('path');

/******************************************
 * Blocking, Synchronous Way 
 ****/

//construct path
var filePath = path.join(__dirname, '..', '1-node-farm', 'txt');
/*
// to read file
const textIn = fs.readFileSync(`${filePath}\\input.txt`,'utf-8');

console.log(textIn);

// text to write out
const textOut = `About avocado: ${textIn}.\n Created on : ${Date.now()}`;

// to write it in a file 
fs.writeFileSync(`${filePath}\\output.txt`, textOut);
console.log('File Written !');
*/

/******************************************
 * Non-Blocking, Asynchronous Way 
 ****/
fs.readFile(`${filePath}\\start.txt`, 'utf-8', (err, data1) => {

    if(err) return console.log('File does not exists !');

    fs.readFile(`${filePath}\\${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);

        fs.readFile(`${filePath}\\append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile(`${filePath}\\final.txt`, `${data2}\n${data3}`, 'utf-8', (err) => {
                console.log('File Written !');
            }); 

        });

    });
    
});

console.log('Hello Praveen ');