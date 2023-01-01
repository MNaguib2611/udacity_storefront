import { ProductStore } from '../../modules/product/product.model';

const store = new ProductStore();
describe('Test Product Model', () => {
  let id = 0;
  const product = {
    name: 'product2',
    price: 100,
    category: 'category1',
  };

  it('order Model create : should create order ', async () => {
    try {
      const result = await store.create(product);
      id = result.id as number;
      expect(result.id).toBeTruthy();
      expect(result.name).toBe('product2');
    } catch (err) {
      console.error(err);
    }
  });
  it('order Model index: should return array ', async () => {
    try {
      const result = await store.index({
        category: '',
      });
      expect(Array.isArray(result)).toBe(true);
    } catch (err) {
      console.error(err);
    }
  });

  it('order Model show: should return product with id', async () => {
    try {
      const result = await store.show(id);
      expect(result).toBeTruthy();
    } catch (err) {
      console.error(err);
    }
  });

  it('order Model popular: should return array ', async () => {
    try {
      const result = await store.popular();
      expect(Array.isArray(result)).toBe(true);
    } catch (err) {
      console.error(err);
    }
  });

  it('order Model getProductByName: should return getProductByName', async () => {
    try {
      const result = await store.getProductByName('product2');
      expect(result).toBeTruthy();
    } catch (err) {
      console.error(err);
    }
  });
});
