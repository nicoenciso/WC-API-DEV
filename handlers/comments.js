import { pool } from "../db/connection.js";

// Publica un nuevo comentario en un post específico
export const createComment = async (content, userId, postId) => {
  const result = await pool.query(
    "INSERT INTO Comments (content, userId, postId) VALUES ($1, $2, $3) RETURNING *;",
    [content, userId, postId]
  );
  console.log("Comment created: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve todos los comentarios de un post específico
export const getCommentsByPostId = async (postId) => {
  const result = await pool.query("SELECT * FROM Comments WHERE postId=$1;", [
    postId,
  ]);
  console.log("Comments for post: ");
  console.log(result.rows);
  return result.rows;
};

// Actualiza un comentario por su id
export const updateComment = async (id, content) => {
  const result = await pool.query(
    "UPDATE Comments SET content=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *;",
    [content, id]
  );
  console.log("Comment updated");
  console.log(result.rows);
  return result.rows;
};

// Elimina un comentario por su id
export const deleteComment = async (id) => {
  const result = await pool.query("DELETE FROM Comments WHERE id=$1", [id]);
  console.log("Comment deleted");
  return result;
}
