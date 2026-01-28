import { UserModel } from "../model/userModel.js";
import {
  validateLoginSchema,
  validateRegisterSchema,
} from "../schema/userSchema.js";
import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.TOKEN_KEY, (error, token) => {
      if (error) reject;
      resolve(token);
    });
  });
};

export const register = async (req, res) => {
  const result = validateRegisterSchema(req.body);
  if (!result.success) {
    return res.status(400).json([{ message: result.error.message }]);
  }

  const { email, username, password } = result.data;

  try {
    const { rows, userId, response } = await UserModel.register(
      email,
      username,
      password,
    );

    if (rows.length > 0) {
      return res.status(400).json([{ message: "User already exists" }]);
    }

    const token = await createAccessToken({ userId });
    res.cookie("token", token);

    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const result = validateLoginSchema(req.body);
  if (!result.success) {
    return res.status(400).json([{ message: result.error.message }]);
  }
  try {
    const { email, password } = result.data;
    const { isMatchPassword, rows, userId, response } = await UserModel.login(
      email,
      password,
    );

    if (rows.length === 0) {
      return res.status(400).json([{ message: "User not found" }]);
    }

    if (!isMatchPassword) {
      return res.status(400).json([{ message: "Incorrect password" }]);
    }

    const token = await createAccessToken({ userId });
    res.cookie("token", token);

    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "");
  return res.sendStatus(201);
};

export const profile = async (req, res) => {
  const id = req.user.userId;
  try {
    const foundUser = await UserModel.profile(id);

    if (foundUser.length === 0) {
      return res.status(400).json([{ message: "user not found" }]);
    }

    return res.status(201).json(foundUser[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json([{ message: "Unauthorized" }]);
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (error, decoded) => {
      if (error) return res.status(401).json([{ message: "Unauthorized" }]);

      const foundUser = await UserModel.verifyToken(decoded.userId);

      return res.json(foundUser[0]);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
