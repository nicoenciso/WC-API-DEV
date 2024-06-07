import request from 'supertest';
import app from '../../app';

describe('Followers', () => {
  it('should allow a user to follow another user', async () => {
    const response = await request(app)
      .post('/api/v1/users/1/follow')
      .send({ userId: 2 });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User 1 is now following User 2');
  });

  it('should not allow a user to follow themselves', async () => {
    const response = await request(app)
      .post('/api/v1/users/1/follow')
      .send({ userId: 1 });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('You cannot follow yourself');
  });

  it('should return a list of followers for a user', async () => {
    const response = await request(app)
      .get('/api/v1/users/2/followers');
    expect(response.statusCode).toBe(200);
    expect(response.body.followers).toContain('User 1');
  });

  it('should return an empty list if a user has no followers', async () => {
    const response = await request(app)
      .get('/api/v1/users/3/followers');
    expect(response.statusCode).toBe(200);
    expect(response.body.followers).toEqual([]);
  });
});
