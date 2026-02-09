import { createDBConnection } from "../config/mysql/mySqlConnection.js";

export class ProductModel {
  static async getProducts(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const connection = await createDBConnection();
    try {
      const [result] = await connection.query(
        `
      SELECT 
        p.id,
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
        p.image,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            "id", c.comment_id,
            "rating", c.ratingComment,
            "comment", c.comment,
            "date", c.date,
            "reviewerName", c.reviewerName,
            "reviewerEmail", c.reviewerEmail
          )
        ) AS comments
      FROM (
        SELECT *
        FROM products
        LIMIT ? OFFSET ?
      ) p
      LEFT JOIN comments c ON p.id = c.product_id
      GROUP BY p.id
      `,
        [limit, offset],
      );

      const [[{ total }]] = await connection.query(
        "SELECT COUNT (*) AS total FROM products",
      );
      return {
        data: result,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    } finally {
      connection.release();
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
      return response;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
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
      return response;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  }
}
