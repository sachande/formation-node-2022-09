import jwt from "jsonwebtoken";

const privateKey = "Q0Z98EAP0Z8ENP90N8AZ";

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
