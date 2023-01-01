import { Product } from '../../modules/product/product.type';
import { Order } from '../../modules/orders/order.type';
import { signupTestUser, createProduct } from '../helpers/helpers';
import supertest from 'supertest';
import { app } from '../../app';

const request = supertest(app);

describe('Test Order endpoints', async () => {
  let id = 0;
  let token: String;
  let product1, product2;
  let order: Order;
  beforeAll(async () => {
    const user = await signupTestUser('testOrder');
    token = `Bearer ${user.token}`;
    product1 = (await createProduct(token)) as Product;
    product2 = (await createProduct(token)) as Product;

    order = {
      status: 'active',
      user_id: user.id as number,
      products: [
        { id: product1.id as Number, quantity: 11 },
        { id: product2.id as Number, quantity: 2001 },
      ],
    };
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
      expect(response.status).toBe(200);
    } catch (err) {
      console.error(err);
    }
  });

  it('Order Create: status code 401 if no token was provided', async () => {
    try {
      const response = await request.post('/orders').send(order);
      expect(response.status).toBe(401);
    } catch (err) {
      console.error(err);
    }
  });

  it('Order Create: status code 201 if  token was provided', async () => {
    try {
      const response = await request
        .post('/orders')
        .send(order)
        .set({ Authorization: token });
      expect(response.status).toBe(201);
      expect(response.body.status).toBe('active');
      id = response.body.id;
    } catch (err) {
      console.error(err);
    }
  });
  it('Order Complete: status code 200 if ', async () => {
    try {
      const response = await request
        .put(`/orders/${id}`)
        .set({ Authorization: token });
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('complete');
    } catch (err) {
      console.error(err);
    }
  });
});
