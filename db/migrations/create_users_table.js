const createUsersTable = `
  CREATE TABLE IF NOT EXISTS Users (
      id VARCHAR PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      birth_date DATE NOT NULL,
      imageUrl TEXT,
      skills VARCHAR(500) DEFAULT NULL,
      description VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export default createUsersTable;
