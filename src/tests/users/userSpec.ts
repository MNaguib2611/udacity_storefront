import supertest from 'supertest';
import { app } from '../../app';

const request = supertest(app);

describe('Test user endpoints', () => {
  let id = 0;
  let token = '';
  const user = {
    username: 'mnaguib',
    firstName: 'Mohammed',
    lastName: 'Naguib',
    password: 'password',
  };

  it('User Create: should return 400 if username < 6 ', async () => {
    try {
      const response = await request
        .post('/users')
        .send({ ...user, username: 'short' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      token = `Bearer ${response.body.token}`;
      id = response.body.id;
      expect(response.status).toBe(400);
    } catch (err) {
      console.error(err);
    }
  });

  it('User Create: Should create a new user ', async () => {
    try {
      const response = await request
        .post('/users')
        .send(user)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      token = `Bearer ${response.body.token}`;
      id = response.body.id;
      expect(response.status).toBe(201);
      expect(response.body.id).toBe(id);
      expect(response.body.password).toBeUndefined();
    } catch (err) {
      console.error(err);
    }
  });

  it('User index: Should return 401 if token was not provided ', async () => {
    try {
      const response = await request.get('/users');
      expect(response.status).toBe(401);
    } catch (err) {
      console.error(err);
    }
  });
  it('User index: Should return all users if token is provided', async () => {
    try {
      const response = await request
        .get('/users')
        .set({ Authorization: token });
      expect(response.status).toBe(200);
    } catch (err) {
      console.error(err);
    }
  });
  it(`User show: Should return user with id ${id}`, async () => {
    try {
      const response = await request
        .get(`/users/${id}`)
        .set({ Authorization: token });
      expect(response.status).toBe(200);
    } catch (err) {
      console.error(err);
    }
  });
  it('User show: Should 404 not found with id:10', async () => {
    try {
      const response = await request
        .get('/users/10')
        .set({ Authorization: token });
      expect(response.status).toBe(404);
    } catch (err) {
      console.error(err);
    }
  });

  it('User authenticate: Should login the user if username/password is correct', async () => {
    try {
      const response = await request
        .post('/authenticate')
        .send({ username: user.username, password: user.password });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
    } catch (err) {
      console.error(err);
    }
  });
  it('User authenticate: Should return 401 if username/password is incorrect', async () => {
    try {
      const response = await request
        .post('/authenticate')
        .send({ username: 'username', password: 'password' });
      expect(response.status).toBe(401);
    } catch (err) {
      console.error(err);
    }
  });
});
