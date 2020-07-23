const EventEmitter = require("events"); //include events module
const http = require("http");

class MyEventEmitter extends EventEmitter {}

const myEmmiter = new MyEventEmitter();

// listener 1
myEmmiter.on("newSale", () => {
  console.log("There was a new sale!");
});

// listener 2
myEmmiter.on("newSale", () => {
  console.log("Customer Name: Jonas");
});

// listener 3 - with arguments
myEmmiter.on("newSale", (stock) => {
  console.log(`There are now ${stock} left in stock.`);
});

myEmmiter.emit("newSale", 9);

//////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request Recieved ! ");
  console.log(req.url);
  res.end("Request Recieved");
});

server.on("close", () => {
  console.log("Server Closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for request");
});
