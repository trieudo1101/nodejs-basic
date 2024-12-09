import Joi from "joi";

const userCreateSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().optional(),
  address: Joi.string().optional(),
  image: Joi.string().optional(),
  gender: Joi.number().optional(),
});

const userUpdateSchema = Joi.object({
  id: Joi.string().required(),
  fullname: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  address: Joi.string().optional(),
  image: Joi.string().optional(),
}).min(1);

export { userCreateSchema, userUpdateSchema };
