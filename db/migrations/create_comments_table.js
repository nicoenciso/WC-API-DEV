const createCommentsTable = `
    CREATE TABLE IF NOT EXISTS Comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        user_id VARCHAR REFERENCES Users(id) ON DELETE CASCADE,
        post_id INT REFERENCES Posts(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export default createCommentsTable;
