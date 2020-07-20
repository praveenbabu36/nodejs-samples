const fs = require('fs'); // file system module
const path = require('path');
const http = require('http');
const url = require('url');
const replaceTemplateModule = require('./modules/replaceTemplate');

/////////////////////////////////////////////////////////////////////////
//Files Sample
/////////////////////////////////////////////////////////////////////////


/******************************************
//  * Blocking, Synchronous Way 
//  ****/

// //construct path
// var filePath = path.join(__dirname, '..', '1-node-farm', 'txt');

// // to read file
// const textIn = fs.readFileSync(`${filePath}\\input.txt`,'utf-8');

// console.log(textIn);

// // text to write out
// const textOut = `About avocado: ${textIn}.\n Created on : ${Date.now()}`;

// // to write it in a file 
// fs.writeFileSync(`${filePath}\\output.txt`, textOut);
// console.log('File Written !');

// /******************************************
//  * Non-Blocking, Asynchronous Way 
//  ****/
// fs.readFile(`${filePath}\\start.txt`, 'utf-8', (err, data1) => {

//     if(err) return console.log('File does not exists !');

//     fs.readFile(`${filePath}\\${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);

//         fs.readFile(`${filePath}\\append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile(`${filePath}\\final.txt`, `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log('File Written !');
//             }); 

//         });

//     });
    
// });

// console.log('Hello Praveen ');



/////////////////////////////////////////////////////////////////////////
//HTTP Server
/////////////////////////////////////////////////////////////////////////

//this is executed only once during the starting of the app - 
var dataFilePath = path.join(__dirname, '..', '1-node-farm', 'dev-data');
var templatePath = path.join(__dirname, '..', '1-node-farm', 'templates');

const overview = fs.readFileSync(`${templatePath}\\overview.html`, 'utf-8');
const product  = fs.readFileSync(`${templatePath}\\product.html`, 'utf-8');
const card     = fs.readFileSync(`${templatePath}\\card.html`, 'utf-8');

// data.json
const data = fs.readFileSync(`${dataFilePath}\\data.json`, 'utf-8');
 
// js object   
const productData = JSON.parse(data);

const server = http.createServer( (req, res) => {
        
    //console.log(req.url);

    /**
     * ES6 destructuring - query, pathname property
     *  names are available in the result of parse method.
     **/ 
    const { query, pathname } = url.parse(req.url, true);


    //Overview page
    if(pathname === '/' || pathname === '/overview') {

        const cardsHtml = productData.map( element => replaceTemplateModule.replaceTemplate(card, element) ).join('');

        const output = overview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(output); 
    
    // Product Page 
    } else if(pathname === '/product') {
        
        console.log('Product ID: ', query.id);
        const output = replaceTemplateModule.replaceTemplate(product, productData[query.id]);

        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(output);

    // API 
    } else if(pathname === '/api') { // to read data.json
        
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(data);

    // Not Found
    } else {
        res.writeHead(404);
        res.end('Page not found!');
    }

});



server.listen(8002, 'localhost', () => {
    console.log('Server has been started!!! Listening to port 8002');
});