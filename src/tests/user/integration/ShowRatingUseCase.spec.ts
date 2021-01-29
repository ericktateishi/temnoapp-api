import app from '@app';
import request from 'supertest';

describe('Show user - integration tests', () => {
  it('should be able to show a user by email', async () => {
    const email = 'mail@test.com';

    const { status, body } = await request(app)
      .get(`/user?email=${email}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send();

    expect(status).toBe(200);
    expect(body.id).toBeDefined();
    expect(body.email).toBe(email);
  });
});
