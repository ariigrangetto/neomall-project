import { CartModel } from "../model/cartModel.js";

export const getAllProductsInCart = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await CartModel.getProductsInCart(userId);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProductById = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.userId;
  try {
    const result = await CartModel.addProduct(id, userId);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const incrementQuantity = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.userId;
  try {
    const result = await CartModel.increment(userId, id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const decrementQuantity = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.userId;
  try {
    const result = await CartModel.decrement(userId, id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFromCartById = async (req, res) => {
  const { id } = req.body;
  const userId = req.user.userId;

  try {
    await CartModel.deleteFromCart(id, userId);
    res.status(200).json([{ message: "Product deleted from cart" }]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
