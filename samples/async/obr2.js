const fs = require("node:fs/promises");

const content1P = fs.readFile("1.txt").catch((err) => {
  console.error("Pas de fichier 1");
});
const content2P = fs.readFile("2.txt").catch((err) => {
  console.error("Pas de fichier 2");
});
const content3P = fs.readFile("3_.txt").catch((err) => {
  console.error("Pas de fichier 3");
});

content1P
  .then((data) => {
    console.log(`1 finish: ${data}`);
    content2P.then((data) => {
      console.log(`2 finish: ${data}`);
      content3P.then((data) => {
        console.log(`3 finish: ${data}`);
      });
    });
  })
  .catch((err) => {
    console.error("Erreur globale", err);
  });
