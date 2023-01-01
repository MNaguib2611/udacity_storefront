import { User } from '../modules/user/user.type';
import { signupTestUser, createProduct } from './helpers/helpers';
import supertest from 'supertest';
import { app } from '../app';

const request = supertest(app);

describe('Test product endpoints', async () => {
  let token: String;
  let product1, product2;
  beforeAll(async () => {
    const user = await signupTestUser();
    token = `Bearer ${user.token}`;
    product1 = createProduct(token);
    product2 = createProduct(token);
  });
  it('Order index:status code 401 from /order route with no token', async () => {
    try {
      const response = await request.get('/orders');
      expect(response.status).toBe(401);
    } catch (err) {
      console.error(err);
    }
  });

  it('Order index: status code 200 if  token was provided', async () => {
    try {
      const response = await request
        .get('/orders')
        .set({ Authorization: token });
      console.log(response);

      expect(response.status).toBe(200);
    } catch (err) {
      console.error(err);
    }
  });

  // it('Product Create: status code 201 if  token was provided', async () => {
  //   try {
  //     const response = await request.post('/products').send(product);
  //     expect(response.status).toBe(201);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

  // it('Product Create: status code 201 if token was provided', async () => {
  //   try {
  //     const response = await request
  //       .post('/products')
  //       .send(product)
  //       .set({ Authorization: token });
  //     expect(response.status).toBe(201);
  //     id = response.body.id;
  //     expect(response.body).toEqual({ ...product, id });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });
});
