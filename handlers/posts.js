import { pool } from "../db/connection.js";

// Publica un nuevo contenido
export const createPost = async (post) => {
  const { title, content, userId, imageUrl, tags } = post;
  const result = await pool.query(
    "INSERT INTO Posts (title, content, userId, imageUrl, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
    [title, content, userId, imageUrl, tags]
  );
  console.log("Post created: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve todos los posts
export const getPosts = async (limit, offset) => {
  const result = await pool.query(
    "SELECT * FROM Posts ORDER BY created_at DESC LIMIT $1 OFFSET $2;",
    [limit, offset]
  );
  console.log("Posts: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve los posts por id del usuario
export const getPostsByUserId = async (userId, limit, offset) => {
  const result = await pool.query(
    "SELECT * FROM Posts WHERE userId = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3;",
    [userId, limit, offset]
  );
  console.log(`Posts by user ${userId}: `);
  console.log(result.rows);
  return result.rows;
};

// Devuelve los posts por un tag en específico
export const getPostsByTag = async (tag, limit, offset) => {
  const result = await pool.query(
    "SELECT * FROM Posts WHERE $1 = ANY(STRING_TO_ARRAY(tags, ',')) ORDER BY created_at DESC LIMIT $2 OFFSET $3;",
    [tag, limit, offset]
  );
  console.log(`Posts by tag ${tag}: `);
  console.log(result.rows);
  return result.rows;
};

//Devuelve un post por su id
export const getPostById = async (limit, offset, userId) => {
  const result = await pool.query(
    "SELECT * FROM Posts WHERE id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3;",
    [id, limit, offset]
  );
  console.log("Post: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve un post mediante búsqueda incremental
export const getPostBySearch = async (search, limit, offset) => {
  const result = await pool.query(
    "SELECT * FROM Posts WHERE title LIKE $1 ORDER BY created_at DESC;",
    [`%${search}%`]
  );
  console.log(`Post search ${search}: `);
  console.log(result.rows);
  return result.rows;
};

// Actualiza un post por su id
export const updatePost = async (id, post) => {
  const { title, content, imageUrl, tags } = post;
  const result = await pool.query(
    "UPDATE Posts SET title=$1, content=$2, imageUrl=$3, tags=$4, updated_at=CURRENT_TIMESTAMP WHERE id=$5 RETURNING *;",
    [title, content, imageUrl, tags, id]
  );
  console.log("Post updated");
  console.log(result.rows);
  return result.rows;
};

// Elimina un post por su id
export const deletePost = async (id) => {
  const result = await pool.query("DELETE FROM Posts WHERE id=$1", [id]);
  console.log("Post deleted");
  return result;
};
