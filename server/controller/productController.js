import { ProductModel } from "../model/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await ProductModel.getProducts();

    if (result.length === 0) {
      return res.status(404).json([{ message: "Products not found" }]);
    }

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json([{ message: "product id not identify" }]);
  }
  try {
    const response = await ProductModel.getProductById(id);

    if (response.length === 0) {
      return res.status(404).json([{ message: "Product not found" }]);
    }

    return res.status(200).json(response[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const filterProducts = async (req, res) => {
  const { category, title } = req.query;

  try {
    const response = await ProductModel.filterProducts(category, title);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
