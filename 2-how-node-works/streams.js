const fs = require("fs");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  // Solution 1
  fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to 8000...");
});
