import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.PG_CONNECTION_STRING;

// Conexión con la base de datos
export const pool = new pg.Pool({
  connectionString,
});
