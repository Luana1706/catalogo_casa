require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        },
        family: 4 
      }
    : {
        user: process.env.DB_USER,        // 'postgres'
  host: process.env.DB_HOST,        // 'localhost'
  database: process.env.DB_NAME,    // Verifique se aqui está DB_NAME (igual ao seu .env)
  password: process.env.DB_PASSWORD,// 'tvantena'
  port: process.env.DB_PORT,        // 5432
      }
);

console.log("🔥 Conexão configurada para:", process.env.NODE_ENV);

module.exports = pool;