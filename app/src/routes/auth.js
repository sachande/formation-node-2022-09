import { client } from "../redis-client.js";
import { z } from "zod";
import { createToken, verifyToken } from "../token.js";
import { HttpError } from "../errors.js";

const AuthSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});

const REQ_USER = Symbol.for("klee.auth.user");

export const register = async (req, res, next) => {
  try {
    const { username, password } = AuthSchema.parse(req.body);

    // TODO hash password

    const inserted = await client.hsetnx("users", username, password);

    if (!inserted) {
      // already existed
      throw new HttpError(409, "User already exists");
      return;
    }

    // user registered successfully
    res.status(201).end();
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const foundPassword = await client.hget("users", username);

    if (!foundPassword) {
      // user does not exist
      throw new HttpError(401, "Invalid username or password");
    }

    // TODO compare hashed password
    if (foundPassword !== password) {
      // wrong password
      throw new HttpError(401, "Invalid username or password");
    }

    // success
    const token = createToken(username);

    res.send({ token });
  } catch (err) {
    next(err);
  }
};

// TODO replace with express-jwt
export const checkToken = (req, res, next) => {
  const token = req.get("Authorization").replace(/Bearer\s+/, "");
  const payload = verifyToken(token);
  req[REQ_USER] = payload;
  next();
};

export const showUsername = (req, res) => {
  res.send({ username: req[REQ_USER].username });
};
