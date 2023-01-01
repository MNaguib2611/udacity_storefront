import { Product } from './../../modules/product/product.type';
import supertest from 'supertest';
import { app } from '../../app';

export const signupTestUser = async (username: String) => {
  const response = await supertest(app).post('/users').send({
    username,
    firstName: 'testuser',
    lastName: 'testuser',
    password: '123456',
  });
  return response.body;
};

export const createProduct = async (token: String): Promise<Product> => {
  const name = (Math.random() + 1).toString(36).substring(7);
  const response = await supertest(app)
    .post('/products')
    .set({ Authorization: token })
    .send({
      name,
      price: 100,
      category: 'Category1',
    });
  return response.body;
};
