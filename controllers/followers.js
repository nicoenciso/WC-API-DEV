import { pool } from "../db/connection.js";
import { Router } from "express";

const followersRouter = Router();

// Seguir a un usuario
followersRouter.post("/follow", async (req, res) => {
  try {
    const { follower_id, followed_id } = req.body;
    const result = await pool.query(
      "INSERT INTO Followers (follower_id, followed_id) VALUES ($1, $2) RETURNING *;",
      [follower_id, followed_id]
    );
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error following user");
  }
});

// Obtener los posts de los usuarios seguidos por un usuario
followersRouter.get("/:id/followed_posts", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT Posts.* FROM Posts
      JOIN Followers ON Posts.user_id = Followers.followed_id
      WHERE Followers.follower_id = $1
      ORDER BY Posts.created_at DESC;
    `, [id]);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching followed users' posts");
  }
});

export default followersRouter;
