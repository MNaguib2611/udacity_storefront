import { OrderStore } from './order.model';
const Joi = require('joi');

const orderSchema = Joi.object({
  status: Joi.string().valid('active', 'complete'),
  products: Joi.array().min(1).required(),
});

export default orderSchema;
