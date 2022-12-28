import { UserStore } from './user.model';
const Joi = require('joi');

const store = new UserStore();
const lookup = async (username: string) => {
  const user = await store.getUserByUsername(username);
  if (user) {
    throw new Error(`Invalid ${username}`);
  }
};

const userSchema = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30).required(),
  lastName: Joi.string().alphanum().min(2).max(30).required(),
  username: Joi.string().alphanum().min(6).max(30).required().external(lookup),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export default userSchema;
