const { promisify } = require("node:util");

const sleep = promisify(setTimeout);

const promises = [
  sleep(450).then(() => 1),
  sleep(400).then(() => {
    throw new Error("nope 1");
  }),
  sleep(500).then(() => 2),
  sleep(4000).then(() => {
    throw new Error("nope 2");
  }),
];

// Promise.all(promises).catch((err) => console.error(err));
// Promise.allSettled(promises).then(console.log);
// Promise.race(promises).catch(console.error);
// Promise.any(promises).then(console.log);
