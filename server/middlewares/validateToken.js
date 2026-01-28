import jwt from "jsonwebtoken";
import "dotenv/config";

export async function validateToken(req, res, next) {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = decoded;
    next();
  });
}
