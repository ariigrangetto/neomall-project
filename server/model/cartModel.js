import { createDBConnection } from "../config/mysql/mySqlConnection.js";

export class CartModel {
  static async getProductsInCart(id) {
    const connection = await createDBConnection();
    const [result] = await connection.query(
      `SELECT product_id, quantity, 
        p.title, 
        p.description, 
        p.category, 
        p.price, 
        p.discountPercentage, 
        p.rating, 
        p.stock, 
        p.brand, 
        p.warrantyInformation, 
        p.shippingInformation, 
        p.availibilityStatus, 
        p.image FROM cart_items 
        JOIN products p ON product_id = p.id
        WHERE user_id = UUID_TO_BIN(?)`,
      [id],
    );

    return result;
  }

  static async addProduct(id, userId) {
    const connection = await createDBConnection();
    const result = await connection.query(
      `
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES (UUID_TO_BIN(?), ?, 1)
        ON DUPLICATE KEY UPDATE
        quantity = quantity + 1
        `,
      [userId, id],
    );
    return result;
  }

  static async increment(userId, id) {
    const connection = await createDBConnection();
    const [result] = await connection.query(
      `UPDATE cart_items
                SET quantity = quantity + 1
                WHERE user_id = UUID_TO_BIN(?)
                AND product_id = ?
                `,
      [userId, id],
    );
    return result;
  }

  static async decrement(userId, id) {
    const connection = await createDBConnection();
    const [result] = await connection.query(
      `
                UPDATE cart_items
                SET quantity = quantity - 1
                WHERE user_id = UUID_TO_BIN(?)
                AND product_id = ?
                `,
      [userId, id],
    );
    return result;
  }

  static async deleteFromCart(id, userId) {
    const connection = await createDBConnection();
    const [result] = await connection.query(
      `
            DELETE FROM cart_items
            WHERE user_id = UUID_TO_BIN(?) 
            AND product_id = ?
        `,
      [userId, id],
    );
    return result;
  }
}
