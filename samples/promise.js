const { promisify } = require("node:util");

const sleep = promisify(setTimeout);

/*

  promise: Promise<T>
  foo: T => U
  promise.then(foo) :: Promise<U>

*/

const work = (argent) => {
  // return Promise.resolve(argent);
  // return Promise.reject(new Error("FIRED"));
  /*
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2000);
    }, 5000);
  });
  */
  return sleep(500).then(() => argent);
};

const stockXbox = 10;

const acheterXbox = (argent) => {
  if (argent < 500) throw new Error("POOR");
  if (stockXbox < 1) throw new Error("OOS");
  console.log("Achat Xbox OK");
  return "Xbox";
};

const acheterPuzzle = (argent) => {
  if (argent < 10) throw new Error("POOR");
  console.log("Achat Puzzle OK");
  return "Puzzle";
};

const jouer = (jouet) => {
  console.log("On s’est bien amusés avec %s", jouet);
};

////////////////

const argentP = work(5); // Promise<2000€>

argentP.then((argent) => {
  console.log("j’ai gagné %s€", argent);
});

const xboxP = argentP.then((argent) => {
  return acheterXbox(argent); // Xbox
}); // Promise<Xbox>

const xboxFallbackP = xboxP.catch((err) => {
  console.error("Oh non pas de Xbox");
  return argentP.then((argent) => acheterPuzzle(argent)); // Promise<Puzzle>
}); // Promise<Xbox | Puzzle>

const joieP = xboxFallbackP.then((jouet) => {
  console.log("On va jouer avec %s", jouet);
  return jouer(jouet); // Moment sympa avec mon gamin
}); // Promise<Moment sympa avec mon gamin>

joieP.catch((err) => {
  console.error("Moment pourri :(");
});

console.log(argentP);
console.log(xboxP);
console.log(joieP);
// argentP pending
// xboxP pending
// joieP pending
// 500ms…
// argentP → resolved(200)
//  exécuter le callback du .then() de argentP → throw
//  xboxP → rejected("POOR")
//    exécuter le callback du .catch() de xboxP
//    NE PAS exécuter le callback du .then() de xboxP → joieP directement rejected

/////////////////

const argentP = work(5); // Promise<2000€>
argentP.then((argent) => console.log("j’ai gagné %s€", argent));
argentP
  .then((argent) => {
    return acheterXbox(argent); // Xbox
  }) // Promise<Xbox>
  .catch((err) => {
    console.error("Oh non pas de Xbox");
    return argentP.then((argent) => acheterPuzzle(argent)); // Promise<Puzzle>
  }) // Promise<Xbox | Puzzle>
  .then((jouet /* Xbox | Puzzle */) => {
    console.log("On va jouer avec %s", jouet);
    return jouer(jouet); // Moment sympa avec mon gamin
  }) // Promise<Moment sympa avec mon gamin>
  .catch((err) => {
    console.error("Moment pourri :(");
  });
