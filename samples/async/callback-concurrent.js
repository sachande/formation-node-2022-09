const fs = require("node:fs");

const buffers = [];
let nbRead = 0;

const readFile = (n) => {
  fs.readFile(`${n}.txt`, (err, content) => {
    if (err) {
      console.error(`failed reading file ${n}`);
      process.exit(100 + n);
    }
    buffers[n - 1] = content;
    nbRead++;
    if (nbRead === 3) end();
  });
};

readFile(1);
readFile(2);
readFile(3);

const end = () => {
  console.log(buffers);
};
