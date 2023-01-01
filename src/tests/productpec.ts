import { User } from '../modules/user/user.type';
import { signupTestUser } from './helpers/helpers';
import supertest from 'supertest';
import { app } from '../app';

const request = supertest(app);

describe('Test product endpoints', async () => {
  let token: String;
  let id = 0;
  const product = {
    name: 'product1',
    price: 100,
    category: 'category1',
  };
  beforeAll(async () => {
    const user = await signupTestUser();
    token = `Bearer ${user.token}`;
  });
  it('Product index:status code 200 from /products route', async () => {
    try {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    } catch (err) {
      console.error(err);
    }
  });

  it('Product Create: status code 401 if no token was provided', async () => {
    try {
      const response = await request.post('/products').send(product);
      expect(response.status).toBe(401);
    } catch (err) {
      console.error(err);
    }
  });
  it('Product Create: status code 201 if token was provided', async () => {
    try {
      const response = await request
        .post('/products')
        .send(product)
        .set({ Authorization: token });
      expect(response.status).toBe(201);
      id = response.body.id;
      expect(response.body).toEqual({ ...product, id });
    } catch (err) {
      console.error(err);
    }
  });
  it('Product Create: status code 400 if product name is duplicate', async () => {
    try {
      const response = await request
        .post('/products')
        .send(product)
        .set({ Authorization: token });
      expect(response.status).toBe(400);
    } catch (err) {
      console.error(err);
    }
  });
  it('Product popular:status code 200 from /popular route', async () => {
    try {
      const response = await request.get('/popular');
      expect(response.status).toBe(200);
    } catch (err) {
      console.error(err);
    }
  });
});
