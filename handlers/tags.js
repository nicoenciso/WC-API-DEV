import { pool } from "../db/connection.js";

// Devuelve los tags ordenados por la cantidad de post creados con ese tag (opcionalmente con un limite de cantidad)
export const getTags = async (limit) => {
  const result = await pool.query(
    "SELECT tag, COUNT(*) AS post_count FROM (SELECT UNNEST(STRING_TO_ARRAY(tags, ',')) AS tag FROM Posts) AS tags GROUP BY tag ORDER BY post_count DESC LIMIT $1;",
    [limit]
  );
  console.log("tags");
  console.log(result.rows);
  return result.rows;
};
