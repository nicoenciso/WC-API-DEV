import { pool } from "../db/connection.js";
import { Router } from "express";

const commentRouter = Router();

// Publica un nuevo comentario en un post específico
commentRouter.post("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;
    const result = await pool.query(
      "INSERT INTO Comments (content, userId, post_id) VALUES ($1, $2, $3) RETURNING *;",
      [content, userId, postId]
    );
    console.log("Comment created: ");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating comment");
  }
});

// Obtiene todos los comentarios de un post específico
commentRouter.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await pool.query("SELECT * FROM Comments WHERE post_id=$1;", [postId]);
    console.log("Comments for post: ");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching comments");
  }
});

// Actualiza un comentario por su id
commentRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { content } = req.body;
    const result = await pool.query(
      "UPDATE Comments SET content=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *;",
      [content, id]
    );
    console.log("Comment updated");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating comment");
  }
});

// Elimina un comentario por su id
commentRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM Comments WHERE id=$1", [id]);
    console.log("Comment deleted");
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting comment");
  }
});

export default commentRouter;
