import Joi from "joi";

const register = Joi.object({
  first_name: Joi.string().max(30).required(),
  last_name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
  address1:Joi.string().required(),
  address2:Joi.string().required(),
  state:Joi.string().required(),
  country:Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const userExits = Joi.object({
  email: Joi.string().required(),
});

const updatePassword = Joi.object({
  email: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export default { register, login ,userExits,updatePassword };
