const fs = require("node:fs/promises");

const readFile = (fileName) => fs.readFile(fileName);

readFile('1.txt').then((content1) => {
    readFile('2.txt').then((content2) => {
        readFile('3.txt').then((content3) => {
            console.log(`set 1 : ${content1} ${content2} ${content3}`);
        })
    })
})

Promise.all([readFile('1.txt'), readFile('2.txt'), readFile('3.txt')]).then((...args) => {
    console.log('set 2 : ', ...args.map(content => content.toString()));
})