import { pool } from "../db/connection.js";

// Crea un nuevo usuario
export const createUser = async (user) => {
  const { id, username, email, first_name, last_name, image_url } = user;
  const result = await pool.query(
    "INSERT INTO Users (id, username, email, first_name, last_name, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
    [id, username, email, first_name, last_name, image_url]
  );
  console.log("User created: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve todos los usuarios (añadido el campo "followers_count" y "following_count")
export const getUsers = async () => {
  const result = await pool.query(
    "SELECT u.*, COUNT(DISTINCT f1.followed_id) AS following_count, COUNT(DISTINCT f2.follower_id) AS followers_count FROM Users u LEFT JOIN Followers f1 ON u.id = f1.follower_id LEFT JOIN Followers f2 ON u.id = f2.followed_id GROUP BY u.id;"
  );
  console.log("Users table: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve un usuario por su id (añadido el campo "followers_count" y "following_count")
export const getUser = async (id) => {
  const result = await pool.query(
    "SELECT u.*, COUNT(DISTINCT f1.followed_id) AS following_count, COUNT(DISTINCT f2.follower_id) AS followers_count FROM Users u LEFT JOIN Followers f1 ON u.id = f1.follower_id LEFT JOIN Followers f2 ON u.id = f2.followed_id WHERE id=$1 GROUP BY u.id;",
    [id]
  );
  console.log("User: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve los usuarios por su nombre de usuario (añadido el campo "followers_count" y "following_count")
export const getUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT u.*, COUNT(DISTINCT f1.followed_id) AS following_count, COUNT(DISTINCT f2.follower_id) AS followers_count FROM Users u LEFT JOIN Followers f1 ON u.id = f1.follower_id LEFT JOIN Followers f2 ON u.id = f2.followed_id WHERE username=$1 GROUP BY u.id;",
    [username]
  );
  console.log("User by username: ");
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
    image_url,
  } = user;
  const result = await pool.query(
    "UPDATE Users SET username=$1, first_name=$2, last_name=$3, skills=$4, description=$5, onboarding_state=$6, image_url=$7, updated_at=CURRENT_TIMESTAMP WHERE id=$8 RETURNING *;",
    [
      username,
      first_name,
      last_name,
      skills,
      description,
      onboarding_state,
      image_url,
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
