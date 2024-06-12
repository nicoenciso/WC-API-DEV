const createPostsTable = `
    CREATE TABLE IF NOT EXISTS Posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        userId VARCHAR REFERENCES Users(id) ON DELETE CASCADE,
        imageUrl VARCHAR(255),
        tags VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export default createPostsTable;
