const fibonnacci = (n) => (n <= 1 ? 1 : fibonnacci(n - 1) + fibonnacci(n - 2));

export const fibo = (req, res) => {
  const n = Number(req.params.number); // req.params: Record<string, string>
  const result = fibonnacci(n);

  /*
  res
    .status(200)
    .set("content-type", "application/json")
    .write(`{"result":${result}}`)
    .end();
  */
  res.send({ result });
};
