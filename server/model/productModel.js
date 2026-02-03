import { createDBConnection } from "../config/mysql/mySqlConnection.js";

export class ProductModel {
  static async getProducts() {
    const connection = await createDBConnection();
    try {
      const [result] = await connection.query(`SELECT 
          id, 
          title, 
          description, 
          category, 
          price, 
          discountPercentage, 
          rating, 
          stock, 
          brand, 
          warrantyInformation, 
          shippingInformation, 
          availibilityStatus, 
          image,
  
          JSON_ARRAYAGG(
              JSON_OBJECT(
                  "id", comment_id,
                  "rating", ratingComment,
                  "comment", comment,
                  "date", date,
                  "reviewerName", reviewerName,
                  "reviewerEmail", reviewerEmail
              )
          ) AS comments
          
          FROM products 
          LEFT JOIN comments ON id = product_id
          GROUP BY id
          `);
      connection.release();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(id) {
    const connection = await createDBConnection();
    try {
      const [response] = await connection.query(
        `SELECT 
          id, 
          title, 
          description, 
          category, 
          price, 
          discountPercentage, 
          rating, 
          stock, 
          brand, 
          warrantyInformation, 
          shippingInformation, 
          availibilityStatus, 
          image,
  
          JSON_ARRAYAGG(
              JSON_OBJECT(
                  "id", comment_id,
                  "rating", ratingComment,
                  "comment", comment,
                  "date", date,
                  "reviewerName", reviewerName,
                  "reviewerEmail", reviewerEmail
              )
          ) AS comments
          
          FROM products 
          LEFT JOIN comments ON id = product_id
          WHERE id = ?
          GROUP BY id
          `,
        [id],
      );
      connection.release();
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async filterProducts(category, title) {
    const connection = await createDBConnection();
    try {
      let query = "SELECT * FROM products WHERE 1 = 1";
      const values = [];

      if (category) {
        query += " AND LOWER(category) LIKE CONCAT('%', LOWER(?), '%')";
        values.push(category);
      }
      if (title) {
        query += " AND LOWER(title) LIKE CONCAT('%', LOWER(?), '%')";
        values.push(title);
      }

      const [response] = await connection.query(query, values);
      connection.release();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
