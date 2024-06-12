import { pool } from "../db/connection.js";

// Publica un nuevo contenido
export const createPost = async (post) => {
  const { title, content, user_id, image_url, tags } = post;
  const result = await pool.query(
    "INSERT INTO Posts (title, content, user_id, image_url, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
    [title, content, user_id, image_url, tags]
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
export const getPostsByUserId = async (user_id, limit, offset) => {
  const result = await pool.query(
    "SELECT * FROM Posts WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3;",
    [user_id, limit, offset]
  );
  console.log(`Posts by user ${user_id}: `);
  console.log(result.rows);
  return result.rows;
};

// Devuelve los posts por un tag en específico (añadido autor)
export const getPostsByTag = async (tag, limit = 10, offset = 0) => {
  const result = await pool.query(
    "SELECT p.*, u.username AS autor_username, u.first_name AS autor_first_name, u.last_name AS autor_lastname, u.image_url AS autor_image_url FROM Posts p JOIN Users u ON p.user_id = u.id WHERE $1 = ANY(STRING_TO_ARRAY(p.tags, ',')) ORDER BY p.created_at DESC LIMIT $2 OFFSET $3;",
    [tag, limit, offset]
  );
  console.log(`Posts by tag ${tag}: `);
  console.log(result.rows);
  return result.rows;
};

//Devuelve un post por su id
export const getPostById = async (user_id) => {
  const result = await pool.query("SELECT * FROM Posts WHERE id = $1;", [id]);
  console.log("Post: ");
  console.log(result.rows);
  return result.rows;
};

// Devuelve un post mediante búsqueda incremental
export const getPostsBySearch = async (search) => {
  const result = await pool.query(
    "SELECT * FROM Posts WHERE title ILIKE $1 ORDER BY created_at DESC;",
    [`${search}%`]
  );
  console.log(`Post search ${search}: `);
  console.log(result.rows);
  return result.rows;
};

// Actualiza un post por su id
export const updatePost = async (id, post) => {
  const { title, content, image_url, tags } = post;
  const result = await pool.query(
    "UPDATE Posts SET title=$1, content=$2, image_url=$3, tags=$4, updated_at=CURRENT_TIMESTAMP WHERE id=$5 RETURNING *;",
    [title, content, image_url, tags, id]
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


