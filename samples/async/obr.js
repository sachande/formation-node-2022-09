const fs = require("node:fs/promises");

const content1P = fs.readFile("1.txt"); // Promise<Buffer>
const content2P = fs.readFile("2.txt"); // Promise<Buffer>
const content3P = fs.readFile("3_.txt"); // Promise<Buffer>

// Proposition 1 : annuler la gestion des "unhandled rejection" en mettant un .catch()
content1P.catch(() => {});
content2P.catch(() => {});
content3P.catch(() => {});

// Le fichier 3 ne peut être ouvert, la promesse sera cassée avant les résolutions des autres
content1P
  .then((data) => {
    // content1P change de statut => on place le callback dans l'event loop
    // au prochain passage elle sera exécutée
    // entre temps content3P a déjà planté
    console.log(`1 finish: ${data}`);
    content2P
      .then((data) => {
        console.log(`2 finish: ${data}`);
        content3P
          .then((data) => {
            console.log(`3 finish: ${data}`);
          })
          .catch((err) => {
            console.error("Pas de fichier 3");
          });
      })
      .catch((err) => {
        console.error("Pas de fichier 2");
      });
  })
  .catch((err) => {
    console.error("Pas de fichier 1");
  });

// Proposition 2: refacto

/*
// Des .catch immédiatement pour gérer le problème de timing (content3 qui casse trop tôt)
content1P.catch(() => console.log("Page de fichier 1"));
content2P.catch(() => console.log("Page de fichier 2"));
content3P.catch(() => console.log("Page de fichier 3"));

// Le fichier 3 ne peut être ouvert, la promesse sera cassée avant les résolutions des autres
content1P
  .then((data) => {
    // content1P change de statut => on place le callback dans l'event loop
    // au prochain passage elle sera exécutée
    // entre temps content3P a déjà planté
    console.log(`1 finish: ${data}`);
    // attention au return pour le chainage des promesses
    return content2P.then((data) => {
      console.log(`2 finish: ${data}`);
      return content3P.then((data) => {
        console.log(`3 finish: ${data}`);
      });
    });
  })
  // sans ça le process est tué pour cause de "unhandled rejection"
  .catch(() => {
    // handle rejection
  });
*/
