import { Router } from "express";
import {
  filterProducts,
  getAllProducts,
  getProductById,
} from "../controller/productController.js";

const productsRoutes = Router();

productsRoutes.get("/", filterProducts);
productsRoutes.get("/", getAllProducts);
productsRoutes.get("/:id", getProductById);

export default productsRoutes;
