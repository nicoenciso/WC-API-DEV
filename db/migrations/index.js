import { pool } from "../connection.js";
import createUsersTable from "./create_users_table.js";
import createCommentsTable from "./create_comments_table.js";
import createPostsTable from "./create_posts_table.js";
 import createFollowersTable from "./create_followers_table.js";
const runDbMigrations = async () => {
  console.log("BEGIN DB MIGRATION");

  // Conecta un solo cliente para una transacción con la base de datos
  const client = await pool.connect();
  console.log("CONNECTED TO THE DATABASE");

  try {
    await client.query("BEGIN"); // Inicio de transacción

    await client.query(createUsersTable);
    await client.query(createPostsTable);
<<<<<<< HEAD
    await client.query(createCommentsTable);

    await client.query( createFollowersTable)
    await client.query("COMMIT"); 

=======
    await client.query(createFollowersTable);
    
    await client.query("COMMIT"); // Crea las tablas
 
>>>>>>> 98e770a40a0f4ec48d441cda08a211eb90130b4d
    console.log("END DB MIGRATION");
  } catch (e) {
    await client.query("ROLLBACK"); 

    console.log("DB migration failed");

    throw e;
  } finally {
    client.release();
  }
};

export default runDbMigrations;
