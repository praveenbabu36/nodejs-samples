const fs = require("fs");
const http = require("http");
const { Readable } = require("stream");

const server = http.createServer();

server.on("request", (req, res) => {
  // Solution 1 - This loads the entire file content to memory
  //   and send it to response
  /*fs.readFile("test-file.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });*/

  // Solution 2 - Using streams
  const readStream = fs.createReadStream("test-file.txt");

  readStream.on("data", (chunk) => {
    res.write(chunk);
  });

  readStream.on("end", () => {
    res.end();
  });

  readStream.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found!");
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to 8000...");
});
