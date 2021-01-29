import app from '@app';
import request from 'supertest';

describe('Create User Use Case - integration tests', () => {
  it('should NOT be able to create a user with invalid request params', async () => {
    const email = 'test@mail.com';
    const name = 'test';
    const location = 'location-id';

    const invalidRequest = [
      {
        email: '',
      },
      {
        email: 'test',
      },
      {
        email,
      },
      {
        email,
        name: '',
      },
      {
        email,
        name,
      },
      {
        email,
        name,
        location: '',
      },
      {
        email,
        name,
        location,
      },
    ];

    const responses = await Promise.all(
      invalidRequest.map(async req => {
        const { status, body } = await request(app)
          .post('/user')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send(req);

        return {
          status,
          error_validation: !!body.validation,
        };
      }),
    );

    const getFalsyErros = responses.find(
      resp => resp.error_validation === false,
    );

    expect(getFalsyErros).toBe(undefined);
  });

  it('should be able to create a user', async () => {
    const user = {
      email: 'test@mail.com',
      name: 'test',
      location: 'location-id',
      password: 'secret',
    };

    const { headers, status } = await request(app)
      .post('/user')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(user);
    expect(status).toBe(200);
    expect(
      headers[(process.env.APP_AUTH_HEADER as string).toLowerCase()],
    ).toBeDefined();
  });
});
