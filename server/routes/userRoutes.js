import { Router } from "express";
import {
  register,
  login,
  profile,
  logout,
  verifyToken,
} from "../controller/userController.js";
import { validateToken } from "../middlewares/validateToken.js";

const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/profile", validateToken, profile);
userRoute.post("/logout", logout);
userRoute.get("/verify", verifyToken);

export default userRoute;
