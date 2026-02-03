import mysql from "mysql2/promise";
import "dotenv/config";

//create pool -> reduce the time spent connecting to the mySql server by reusing a previous connection;

export const createDBConnection = async () => {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  const connection = await pool.getConnection();
  return connection;
};
