import supertest from 'supertest';
import { app } from '../../app';

export const signupTestUser = async () => {
  const response = await supertest(app).post('/users').send({
    username: 'testuser',
    firstName: 'testuser',
    lastName: 'testuser',
    password: '123456',
  });
  return response.body;
};

export const createProduct = async (token: String) => {
  const name = (Math.random() + 1).toString(36).substring(7);
  const response = await supertest(app)
    .post('/users')
    .set({ Authorization: token })
    .send({
      username: name,
      price: 100,
      category: 'Category1',
    });
  return response.body;
};
