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

// Obtener los posts de los usuarios seguidos por un usuario
export const getFollowedUsersPosts = async (id) => {
  const result = await pool.query(`
    SELECT Posts.* FROM Posts
    JOIN Followers ON Posts.user_id = Followers.followed_id
    WHERE Followers.follower_id = $1
    ORDER BY Posts.created_at DESC;
  `, [id]);
  console.log("Followed users' posts: ", result.rows);
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
