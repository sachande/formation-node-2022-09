const { readFile } = require("node:fs/promises");

const ac = new AbortController();

const promise = readFile("./promise-abort.js", {
  signal: ac.signal,
});

ac.abort();

promise.then(console.log).catch(console.error);
