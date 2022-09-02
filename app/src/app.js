import express from "express";
import { checkToken, login, register, showUsername } from "./routes/auth.js";
import { fibo } from "./routes/fibo.js";
import bodyParser from "body-parser";

export const app = express();

app.set("x-powered-by", false);

app.use(bodyParser.json()); // {"username":"toto","password":"tata"}
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // username=toto&password=tata

const cacheControlMiddleware = (req, res, next) => {
  res.set("Cache-Control", "public, max-age=86400, s-maxage=86400"); // 1 day
  next();
};
// app.use('/fibo/*', cacheControlMiddleware);

const errorHandler = (err, req, res, next) => {
  if (err.name === "ZodError") {
    res.status(400).send({ error: "Invalid input", issues: err.issues });
    return;
  }
  if (err.name === "HttpError") {
    res.status(err.statusCode).send({ error: err.message });
    return;
  }
  res.status(500).send({ error: err.message });
};

// const restricted = (role) => (req, res, next) => {
//   // TODO check user is authenticated and has role
//   if (ok) return next();
//   res.status(403).send("nope");
// };

// app.use(middleware);

app.get("/fibo/:number([0-9]+)", cacheControlMiddleware, fibo);

// app.get("/private", restricted(), privateHandler);
// app.get("/admin", restricted("admin"), adminHandler);

app.post("/auth/register", register); // username + password => OK
app.post("/auth/login", login); // username + password => JWT
app.get("/auth/check", checkToken, showUsername); // Header "Authorization": "Bearer ${JWT}" => username
app.post("/auth/refresh"); // (TODO) JWT (expiré depuis moins d'1h) => JWT

app.use(errorHandler);
