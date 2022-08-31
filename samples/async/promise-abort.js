const fs = require("node:fs/promises");

// 1: 1s
// 2: 3s
// 3: 2s

const ac = new AbortController();

const filenames = ["1", "2", "3"];
const promises = filenames.map((fileName) => {
  return fs.readFile(`${fileName}.txt`, { signal: ac.signal });
});

// Promise.all: Array<Promise<T>> => Promise<Array<T>>

Promise.all(promises /* Array<Promise<Buffer>> */) // Promise<Array<Buffer>>
  .then((buffers) => {
    end(buffers);
  })
  .catch((err) => {
    // Abort all reads
    ac.abort();
  });

/*
const [p1, p2, p3] = promises;
p1.then((c1) => {
  // T + 1s
  p2.then((c2) => {
    // T + 3s (+2s)
    p3.then((c3) => {
      // T + 3s (+2s) => fullfilled depuis 1s
      end([c1, c2, c3]); // T + 3s
    });
  });
});
*/

const end = (buffers) => {
  console.log(buffers);
};
