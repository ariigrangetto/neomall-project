import { Router } from "express";
import {
  getAllProductsInCart,
  addProductById,
  deleteFromCartById,
  incrementQuantity,
  decrementQuantity,
} from "../controller/cartController.js";
import { validateToken } from "../middlewares/validateToken.js";

const cartRoute = Router();

cartRoute.get("/", validateToken, getAllProductsInCart);
cartRoute.post("/", validateToken, addProductById);
cartRoute.delete("/", validateToken, deleteFromCartById);
cartRoute.patch("/increment", validateToken, incrementQuantity);
cartRoute.patch("/decrement", validateToken, decrementQuantity);

export default cartRoute;
