import { ProductStore } from './product.model';
const Joi = require('joi');

const store = new ProductStore();
const lookup = async (productName: string) => {
  const user = await store.getProductByName(productName);
  if (user) {
    throw new Error(`Invalid ${productName}`);
  }
};

const productSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required().external(lookup),
  price: Joi.number().min(0.01),
  category: Joi.string().alphanum().min(3).max(30).required(),
});

export default productSchema;
