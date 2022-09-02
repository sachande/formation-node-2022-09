import jwt from "jsonwebtoken";
import config from "./config.js";

const privateKey = config.jwt_key;

export const createToken = (username) => {
  const token = jwt.sign({ username }, privateKey, {
    expiresIn: "24h",
  });
  return token;
};

export const verifyToken = (token) => {
  const payload = jwt.verify(token, privateKey);
  return payload; // { username }
};
