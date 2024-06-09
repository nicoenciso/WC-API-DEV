const createUsersTable = `
    CREATE TABLE IF NOT EXISTS Users (
        id VARCHAR PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        email VARCHAR(100) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        image_url TEXT NOT NULL,
        skills VARCHAR(500),
        description VARCHAR(500),
        onboarding_state BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export default createUsersTable;
