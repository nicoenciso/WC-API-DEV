import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = "postgres://default:tYLE1GkmV9lB@ep-aged-leaf-79142791.us-west-2.aws.neon.tech:5432/verceldb?sslmode=require";

// Conexión con la base de datos
export const pool = new pg.Pool({
  connectionString,
});
