import { pool } from "../db/connection.js";

// Seguir a un usuario
export const followUser = async (follower_id, followed_id) => {
  const result = await pool.query(
    "INSERT INTO Followers (follower_id, followed_id) VALUES ($1, $2) RETURNING *;",
    [follower_id, followed_id]
  );
  console.log("User followed: ", result.rows);
  return result.rows[0];
};

// Dejar de seguir a un usuario
export const unfollowUser = async (follower_id, followed_id) => {
  const result = await pool.query(
    "DELETE FROM Followers WHERE follower_id = $1 AND followed_id = $2 RETURNING *;",
    [follower_id, followed_id]
  );
  console.log("User unfollowed: ", result.rows);
  return result.rows[0];
};

// Obtener los seguidores de un usuario
export const getFollowers = async (id) => {
  const result = await pool.query(
    "SELECT u.* FROM Users u JOIN Followers f ON u.id = f.follower_id WHERE f.followed_id = $1;",
    [id]
  );
  console.log("Followers: ", result.rows);
  return result.rows;
};

// Obtener a quienes sigue un usuario
export const getFollowing = async (id) => {
  const result = await pool.query(
    "SELECT u.* FROM Users u JOIN Followers f ON u.id = f.followed_id WHERE f.follower_id = $1;",
    [id]
  );
  console.log("Following: ", result.rows);
  return result.rows;
};

// Obtener los posts de los usuarios seguidos por un usuario con detalles del autor y paginación
export const getFollowedUsersPosts = async (id, limit, offset) => {
  const result = await pool.query(`
    SELECT 
      p.*, 
      u.username AS autor_username, 
      u.first_name AS autor_first_name, 
      u.last_name AS autor_last_name, 
      u.image_url AS autor_image_url 
    FROM Posts p
    JOIN Followers f ON p.user_id = f.followed_id
    JOIN Users u ON p.user_id = u.id
    WHERE f.follower_id = $1
    ORDER BY p.created_at DESC
    LIMIT $2  OFFSET $3;
  `, [id, limit, offset]);
  console.log("Followed users' posts: ");
  console.log(result.rows);
  return result.rows;
};


// Obtener los cinco usuarios más seguidos
export const getTopFollowedUsers = async () => {
  const result = await pool.query(`
    SELECT u.*, COUNT(f.followed_id) AS followers_count
    FROM Users u
    JOIN Followers f ON u.id = f.followed_id
    GROUP BY u.id
    ORDER BY followers_count DESC
    LIMIT 5;
  `);
  console.log("Top followed users: ", result.rows);
  return result.rows;
};


export const getFollowedPosts = async (followerId) => {

const result = await pool.query(
        `SELECT
            p.*,
            u.username AS autor_username,
            u.first_name AS autor_first_name,
            u.last_name AS autor_last_name,
            u.image_url AS autor_image_url
        FROM Posts p
        JOIN Followers f ON p.user_id = f.followed_id
        JOIN Users u ON p.user_id = u.id
        WHERE f.follower_id = $1
        ORDER BY p.created_at DESC;`,
        [followerId]
    );
    console.log("Posts de usuarios seguidos: ", result.rows);
    return result.rows;
};
