import { use, useEffect, useState } from "react";
import { Cart } from "../utils/types";
import {
  addProductToCart,
  decrementProductQuantity,
  deleteFromCart,
  getCart,
  incrementProductQuantity,
} from "../api/cart.js";

export default function useCartActions() {
  const [cart, setCart] = useState<Cart[]>([]);

  async function getProductsInCart() {
    try {
      const { data } = await getCart();
      setCart(data);
    } catch (error: any) {
      throw new Error("Error fetching products in cart " + error.message);
    }
  }

  useEffect(() => {
    getProductsInCart();
  }, []);

  async function addProduct(id: number | string) {
    const findedProductInCart = cart.find((cart) => cart.product_id === id);
    if (findedProductInCart) {
      try {
        const { product_id } = findedProductInCart;
        await incrementProductQuantity(product_id);
        await getProductsInCart();
      } catch (error: any) {
        throw new Error("Error updating quantity " + error.message);
      }
    } else {
      try {
        addProductToCart(id);
        await getProductsInCart();
      } catch (error: any) {
        throw new Error("Error adding product to cart " + error.message);
      }
    }
  }

  async function decrementQuantity(id: number | string) {
    const findedProductInCart = cart.find((cart) => cart.product_id === id);

    if (findedProductInCart) {
      try {
        const { product_id } = findedProductInCart;
        await decrementProductQuantity(product_id);
        getProductsInCart();
      } catch (error: any) {
        throw new Error("Error decrementing product quantity " + error.message);
      }
    }
  }

  async function deleteProductFromCart(id: number | string) {
    const findedProductInCart = cart.find((cart) => cart.product_id === id);

    if (findedProductInCart) {
      try {
        const { product_id } = findedProductInCart;
        await deleteFromCart(product_id);
        getProductsInCart();
      } catch (error: any) {
        throw new Error("Error deleting product from cart " + error.message);
      }
    }
  }

  return { cart, addProduct, decrementQuantity, deleteProductFromCart };
}
