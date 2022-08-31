const fs = require("node:fs");

const buffers = [];

fs.readFile("1.txt", (err, content1) => {
  if (err) {
    console.error("failed reading file 1");
    process.exit(101);
  }

  buffers.push(content1);
  fs.readFile("2.txt", onRead2);
});

const onRead2 = (err, content2) => {
  if (err) {
    console.error("failed reading file 2");
    process.exit(102);
  }

  buffers.push(content2);
  fs.readFile("3.txt", onRead3);
};

const onRead3 = (err, content3) => {
  if (err) {
    console.error("failed reading file 3");
    process.exit(103);
  }

  buffers.push(content3);
  end();
};

const end = () => {
  console.log(buffers);
};
