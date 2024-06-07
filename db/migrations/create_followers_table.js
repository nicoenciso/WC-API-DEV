const createFollowersTable = `
  CREATE TABLE IF NOT EXISTS Followers (
      follower_id VARCHAR REFERENCES Users(id),
      followed_id VARCHAR REFERENCES Users(id),
      PRIMARY KEY (follower_id, followed_id)
  );
`;

export default createFollowersTable;
