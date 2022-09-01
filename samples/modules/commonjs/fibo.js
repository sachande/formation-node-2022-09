const fibo = (n) => {
  throw new Error("nope");
  if (n <= 1) return 1;
  return fibo(n - 1) + fibo(n - 2);
};

// module.exports.fibo = fibo; // OK
module.exports = { fibo }; // OK

// exports.fibo = fibo; // OK
// exports = { fibo }; // !OK !!
