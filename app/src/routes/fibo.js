import { fibonacci } from "../fibonacci.js";

export const fibo = (req, res) => {
  const n = Number(req.params.number); // req.params: Record<string, string>
  const result = fibonacci(n);

  /*
  res
    .status(200)
    .set("content-type", "application/json")
    .write(`{"result":${result}}`)
    .end();
  */
  res.send({ result });
};
