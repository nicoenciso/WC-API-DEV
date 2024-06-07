import request from 'supertest';
import app from '../../app';

describe('Posts', () => {
  it('should create a new post', async () => {
    const newPost = {
      userId: 1,
      title: 'Test Post',
      content: 'This is a test post content.',
    };
    const response = await request(app)
      .post('/api/v1/posts')
      .send(newPost);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(newPost.title);
  });

  it('should retrieve a post by ID', async () => {
    const response = await request(app)
      .get('/api/v1/posts/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
  });

  // Add more tests as needed
});
