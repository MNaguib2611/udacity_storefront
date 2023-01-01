import { User } from './../../modules/user/user.type';
import { OrderStore } from '../../modules/orders/order.model';
import { signupTestUser, createProduct } from '../helpers/helpers';
import { Product } from '../../modules/product/product.type';
import { Order } from '../../modules/orders/order.type';
import { userInfo } from 'os';

const store = new OrderStore();
describe('Test order Model', () => {
  let id = 0;
  let user: User;
  let token: String;
  let product1, product2;
  let order: Order;
  beforeAll(async () => {
    user = await signupTestUser('testOrderModel');
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
  it('order Model create : should create order ', async () => {
    try {
      const result = await store.create(order);
      id = result.id as number;
      expect(result.id).toBeTruthy();
    } catch (err) {
      console.error(err);
    }
  });
  it('order Model index: should return array ', async () => {
    try {
      const result = await store.index({ user_id: user.id as number });
      expect(Array.isArray(result)).toBe(true);
    } catch (err) {
      console.error(err);
    }
  });

  it('order Model show: should return order with id', async () => {
    try {
      const result = await store.show(id);
      expect(result).toBeTruthy();
    } catch (err) {
      console.error(err);
    }
  });

  it('User Model authenticate: should return user username/password', async () => {
    try {
      const result = await store.complete(id);
      expect(result).toBeTruthy();
      expect(result.status).toBe('complete');
    } catch (err) {
      console.error(err);
    }
  });
});
