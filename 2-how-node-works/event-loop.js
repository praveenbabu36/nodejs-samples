const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("----------------");
  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => {
    console.log("Process.nextTick");
  });

  //encryption function
  crypto.pbkdf2Sync("driverScuba123$", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password Encrypted 1");

  crypto.pbkdf2Sync("driverScuba124$", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password Encrypted 2");

  crypto.pbkdf2Sync("driverScuba125$", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password Encrypted 3");

  crypto.pbkdf2("driverScuba126$", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password Encrypted 4");
  });
});

console.log("Hello from top-level code");
