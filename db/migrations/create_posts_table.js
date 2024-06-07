const createPostsTable = `
  CREATE TABLE IF NOT EXISTS Posts (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR REFERENCES Users(id),
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export default createPostsTable;
