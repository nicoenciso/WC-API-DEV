import { Router } from "express";
import {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
} from "../handlers/comments.js";

const commentsRouter = Router();

// Publica un nuevo comentario en un post específico
commentsRouter.post("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content, userId } = req.body;
    const createdComment = await createComment(content, userId, postId);
    res.send(createdComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating comment");
  }
});

// Obtiene todos los comentarios de un post específico
commentsRouter.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await getCommentsByPostId(postId);
    res.send(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching comments");
  }
});

// Actualiza un comentario por su id
commentsRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { content } = req.body;
    const updatedComment = await updateComment(id, content);
    res.send(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating comment");
  }
});

// Elimina un comentario por su id
commentsRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteComment(id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting comment");
  }
});

export default commentsRouter;
