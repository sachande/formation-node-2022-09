const fs = require("node:fs/promises");

const mainSeries = async () => {
  try {
    const buffers = [
      await fs.readFile("1.txt"),
      await fs.readFile("2.txt"),
      await fs.readFile("3.txt"),
    ];
    console.log(buffers);
  } catch (err) {
    console.error(err);
  }
};

const mainConcurrent = async () => {
  try {
    const buffersP = [
      fs.readFile("1.txt"),
      fs.readFile("2.txt"),
      fs.readFile("_3.txt"),
    ];
    const buffers = await Promise.all(buffersP);
    console.log(buffers);
  } catch (err) {
    console.error(err);
  }
};

const mainOBR = async () => {
  const content1P = fs.readFile("1.txt"); // Promise<Buffer>
  const content2P = fs.readFile("2.txt"); // Promise<Buffer>
  const content3P = fs.readFile("3_.txt"); // Promise<Buffer>

  try {
    const data = await content1P;
    console.log(`1 finish: ${data}`);
    try {
      const data = await content2P;
      console.log(`2 finish: ${data}`);
      try {
        const data = await content3P;
        console.log(`3 finish: ${data}`);
      } catch (err) {
        console.error("Pas de fichier 3");
      }
    } catch (err) {
      console.error("Pas de fichier 2");
    }
  } catch (err) {
    console.error("Pas de fichier 1");
  }
};

mainConcurrent();
