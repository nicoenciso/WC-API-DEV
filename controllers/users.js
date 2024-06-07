import { pool } from "../db/connection.js";
import { Router } from "express";

const usersRouter = Router();

//Crea un nuevo usuario
usersRouter.post("/", async (req, res) => {
  try {
    const { id, username, email, name, last_name, birth_date, imageUrl } = req.body;
    const result = await pool.query(
      "INSERT INTO Users (id, username, email, name, last_name, birth_date, imageUrl) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [id, username, email, name, last_name, birth_date, imageUrl]
    );
    console.log("User created: ");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
  }
});

//Devuelve todos los usuarios
usersRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Users;");
    console.log("Users table: ");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
  }
});

//Devuelve un usuario por su id
usersRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("SELECT * FROM Users WHERE id=$1;", [id]);
    console.log("User: ");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
  }
});

//Actualiza un usuario por su id
usersRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, last_name, skills, description, followers, followed, imageUrl } =
      req.body;
    const result = await pool.query(
      "UPDATE Users SET name=$1, last_name=$2, skills=$3, description=$4, followers=$5, followed=$6, imageUrl=$7, updated_at=CURRENT_TIMESTAMP WHERE id=$8 RETURNING *;",
      [name, last_name, skills, description, followers, followed, imageUrl, id]
    );
    console.log("User updated");
    console.table(result.rows);
    res.send(result.rows);
  } catch (error) {
    console.error(error);
  }
});

//Elimina un usuario por su id
usersRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("DELETE FROM Users WHERE id=$1", [id]);
    console.log("User deleted");
    res.send(result);
  } catch (error) {
    console.error(error);
  }
});

export default usersRouter;
