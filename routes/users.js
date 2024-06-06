import { Router } from "express";
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../handlers/users.js";

const usersRouter = Router();

//Crea un nuevo usuario
usersRouter.post("/", async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await createUser(user);
    res.send(createdUser);
  } catch (error) {
    console.error(error);
  }
});

//Devuelve todos los usuarios
usersRouter.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (error) {
    console.error(error);
  }
});

//Devuelve un usuario por su id
usersRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUser(id);
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

//Actualiza un usuario por su id
usersRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const updatedUser = await updateUser(id, user);
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
  }
});

//Elimina un usuario por su id
usersRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteUser(id);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

export default usersRouter;
