const createUsersTable = `
    CREATE TABLE IF NOT EXISTS Users (
        id VARCHAR PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        email VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        birth_date VARCHAR(100),
        imageUrl TEXT NOT NULL,
        skills VARCHAR(500),
        description VARCHAR(500),
        followers INTEGER DEFAULT 0,
        followed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export default createUsersTable;
