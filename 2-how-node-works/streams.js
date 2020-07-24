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
  /*const readStream = fs.createReadStream("test-file.txt");

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
  });*/

  // solution 2 has the problem of backpressure as read using stream is faster than response write.
  //     this may cause data backlog over the network.
  //

  /**
   * Solution 3 - Using pipe() of read stream
   */
  const readStream = fs.createReadStream("test-file.txt");
  readStream.pipe(res); // pipe into a writable stream.

  readStream.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found!");
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to 8000...");
});
