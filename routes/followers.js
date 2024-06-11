import { Router } from "express";
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowedUsersPosts,
  getTopFollowedUsers,
  
} from "../handlers/followers.js";

const followersRouter = Router();

// Seguir a un usuario
followersRouter.post("/follow", async (req, res) => {
  try {
    const { follower_id, followed_id } = req.body;
    const result = await followUser(follower_id, followed_id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error following user");
  }
});

// Dejar de seguir a un usuario
followersRouter.post("/unfollow", async (req, res) => {
  try {
    const { follower_id, followed_id } = req.body;
    const result = await unfollowUser(follower_id, followed_id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error unfollowing user");
  }
});

// Obtener los seguidores de un usuario
followersRouter.get("/:id/followers", async (req, res) => {
  try {
    const id = req.params.id;
    const followers = await getFollowers(id);
    res.send(followers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching followers");
  }
});

// Obtener a quienes sigue un usuario
followersRouter.get("/:id/following", async (req, res) => {
  try {
    const id = req.params.id;
    const following = await getFollowing(id);
    res.send(following);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching following");
  }
});

// Obtener los posts de los usuarios seguidos por un usuario
followersRouter.get("/:id/followed_posts", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await getFollowedUsersPosts(id);
    res.send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching followed users' posts");
  }
});

// Obtener los cinco usuarios más seguidos
followersRouter.get("/top_followed", async (req, res) => {
  try {
    const users = await getTopFollowedUsers();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching top followed users");
  }
});

export default followersRouter;
