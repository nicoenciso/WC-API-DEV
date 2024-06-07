import request from 'supertest';
import app from '../../app';

describe('Users', () => {
  it('should create a new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      name: 'Test',
      last_name: 'User',
      birth_date: '1990-01-01',
      imageUrl: 'https://example.com/testuser.jpg',
    };
    const response = await request(app)
      .post('/api/v1/users')
      .send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe(newUser.username);
  });

  it('should retrieve a user by ID', async () => {
    const response = await request(app)
      .get('/api/v1/users/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should update a user by ID', async () => {
    const updatedInfo = {
      name: 'Updated',
      last_name: 'User',
    };
    const response = await request(app)
      .put('/api/v1/users/update/1')
      .send(updatedInfo);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].name).toBe(updatedInfo.name);
  });

  it('should delete a user by ID', async () => {
    const response = await request(app)
      .delete('/api/v1/users/delete/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.rowCount).toBe(1);
  });
});
