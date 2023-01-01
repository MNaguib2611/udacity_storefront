import { UserStore } from './../user/user.model';
const Joi = require('joi');

const store = new UserStore();

const lookup = async (id: number) => {
  const user = await store.show(id);
  if (!user) {
    throw new Error(`Invalid ${id}`);
  }
};

const orderSchema = Joi.object({
  status: Joi.string().valid('active', 'complete'),
  products: Joi.array().min(1).required(),
  user_id: Joi.number().required().external(lookup),
});

export default orderSchema;
