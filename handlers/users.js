import { pool } from "../db/connection.js";

// Crea un nuevo usuario
export const createUser = async (user) => {
  const { id, username, email, first_name, last_name, imageUrl } = user;
  const result = await pool.query(
    "INSERT INTO Users (id, username, email, first_name, last_name, imageUrl) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
    [id, username, email, first_name, last_name, imageUrl]
  );
  console.log("User created: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve todos los usuarios
export const getUsers = async () => {
  const result = await pool.query("SELECT * FROM Users;");
  console.log("Users table: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve un usuario por su id
export const getUser = async (id) => {
  const result = await pool.query("SELECT * FROM Users WHERE id=$1;", [id]);
  console.log("User: ");
  console.log(result.rows);
  return result.rows;
};

// Actualiza un usuario por su id
export const updateUser = async (id, user) => {
  const {
    username,
    first_name,
    last_name,
    skills,
    description,
    onboarding_state,
    imageUrl,
  } = user;
  const result = await pool.query(
    "UPDATE Users SET username=$1, first_name=$2, last_name=$3, skills=$4, description=$5, onboarding_state=$6, imageUrl=$7, updated_at=CURRENT_TIMESTAMP WHERE id=$8 RETURNING *;",
    [
      username,
      first_name,
      last_name,
      skills,
      description,
      onboarding_state,
      imageUrl,
      id,
    ]
  );
  console.log("User updated");
  console.log(result.rows);
  return result.rows;
};

// Elimina un usuario por su id
export const deleteUser = async (id) => {
  const result = await pool.query("DELETE FROM Users WHERE id=$1", [id]);
  console.log(`User deleted: ${id}`);
  return result;
};
