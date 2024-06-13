import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostsByUserId,
  getPostsByTag,
  getPostById,
  getPostsBySearch,
  updatePost,
  deletePost,
} from "../handlers/posts.js";

const postRouter = Router();

// Publica un nuevo contenido
postRouter.post("/", async (req, res) => {
  try {
    const post = req.body;
    const createdPost = await createPost(post);
    res.send(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating post");
  }
});

// Devuelve todos los posts (añadido autor)
postRouter.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const posts = await getPosts(limit, offset);
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts");
  }
});

// Devuelve los posts por id del usuario (añadido autor)
postRouter.get("/user/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const posts = await getPostsByUserId(user_id, limit, offset);
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts by user id");
  }
});

// Devuelve los posts por un tag en específico (añadido autor)
postRouter.get("/tag/:tag", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const tag = req.params.tag;
    const posts = await getPostsByTag(tag, limit, offset);
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching posts by tag");
  }
});

// Devuelve un post por su id (añadido autor)
postRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await getPostById(id);
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching post by id");
  }
});

// Devuelve un post mediante búsqueda incremental
postRouter.get("/search/:searchParam", async (req, res) => {
  try {
    const searchParam = req.params.searchParam;
    const searchedPosts = await getPostsBySearch(searchParam);
    res.send(searchedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching posts");
  }
});

// Actualiza un post por su id
postRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = req.body;
    const updatedPost = await updatePost(id, post);
    res.send(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating post");
  }
});

// Elimina un post por su id
postRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deletePost(id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting post");
  }
});

export default postRouter;
