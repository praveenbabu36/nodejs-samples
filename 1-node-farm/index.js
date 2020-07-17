const fs = require('fs'); // file system module
const path = require('path');
const http = require('http');
const url = require('url');

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
        
    const pathName = req.url;

    //Overview page
    if(pathName === '/' || pathName === '/overview') {

        const cardsHtml = productData.map( element => replaceTemplate(card, element) ).join('');

        //console.log(cardsHtml);
        
        const output = overview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.writeHead(200, {'Content-type': 'text/html'});

        res.end(output); 
    
    // Product Page 
    } else if(pathName === '/product') {
        
        res.end(productOverview);

    // API 
    } else if(pathName === '/api') { // to read data.json
        
        res.end(templateOverview);

    // Not Found
    } else {
        res.writeHead(404);
        res.end('Page not found!');
    }

});

const replaceTemplate = (temp, prdEl) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/ig, prdEl.productName);
    output = output.replace(/{%PRODUCT_IMAGe%}/ig, prdEl.image,);
    output = output.replace(/{%PRODUCT_FROM%}/ig, prdEl.from);
    output = output.replace(/{%PRODUCT_IMAGe%}/ig, prdEl.image);
    output = output.replace(/{%PRODUCT_QTY%}/ig, prdEl.quantity);
    output = output.replace(/{%PRODUCT_PRICE%}/ig, prdEl.price);
    output = output.replace(/{%PRODUCT_NUTRIENTS%}/ig, prdEl.nutrients);
    output = output.replace(/{%PRODUCT_ID%}/ig, prdEl.id);
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/ig, prdEl.description);

    console.log(prdEl.organic);

    if(!prdEl.organic) {
        // not-organic is a css class which hides the div in template
        output = output.replace(/{%NOT_ORGANIC%}/ig, 'not-organic');
    }
    //console.log('Output --> : ', output);
    return output;
}

server.listen(8002, 'localhost', () => {
    console.log('Server has been started!!! Listening to port 8002');
});