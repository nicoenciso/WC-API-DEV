import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  getUserByUsername,
  updateUser,
  deleteUser,
} from "../handlers/users.js";

const usersRouter = Router();

// Crea un nuevo usuario
usersRouter.post("/", async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await createUser(user);
    res.send(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating post");
  }
});

// Devuelve todos los usuarios (añadido el campo "followers_count" y "following_count")
usersRouter.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
});

// Devuelve un usuario por su id (añadido el campo "followers_count" y "following_count")
usersRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user by id");
  }
});

// Devuelve los usuarios por su nombre de usuario (añadido el campo "followers_count" y "following_count")
usersRouter.get("/user/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await getUserByUsername(username);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching user by username");
  }
});

// Actualiza un usuario por su id
usersRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await updateUser(id, user);
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
});

// Elimina un usuario por su id
usersRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
});

export default usersRouter;
