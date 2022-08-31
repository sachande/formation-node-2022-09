const fs = require("fs");

const fibo = (n) => {
  if (n <= 1) return 1;
  if (n === 2) return 2;
  return fibo(n - 1) + fibo(n - 2);
};

const codeSuperLent = () => {
  //console.log(fibo(10));
  fibo(30);
};

const tick = () => {
  process.nextTick(tick);
  codeSuperLent(); // > 1ms
};

process.nextTick(tick);

fs.readFile("arrow.js", (err, content) => {
  console.log("read arrow.js", content);
});
