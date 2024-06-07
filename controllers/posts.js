import { pool } from "../db/connection.js";
import { Router } from "express";

const postRouter = Router();

// Publica un nuevo contenido
postRouter.post("/", async (req, res) => {
  try {
    const { title, content, userId, imageUrl } = req.body;
    const result = await pool.query(
      "INSERT INTO Posts (title, content, userId, image_url) VALUES ($1, $2, $3, $4) RETURNING *;",
      [title, content, userId, imageUrl]
    );
    console.log("Post created: ");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating post");
  }
});

// Devuelve todos los posts
postRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Posts;");
    console.log("Posts table: ");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
});

// Devuelve un post por su id
postRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("SELECT * FROM Posts WHERE id=$1;", [id]);
    console.log("Post: ");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching post");
  }
});

// Actualiza un post por su id
postRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content, imageUrl } = req.body;
    const result = await pool.query(
      "UPDATE Posts SET title=$1, content=$2, image_url=$3, updated_at=CURRENT_TIMESTAMP WHERE id=$4 RETURNING *;",
      [title, content, imageUrl, id]
    );
    console.log("Post updated");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating post");
  }
});

// Elimina un post por su id
postRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM Posts WHERE id=$1", [id]);
    console.log("Post deleted");
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting post");
  }
});

export default postRouter;
