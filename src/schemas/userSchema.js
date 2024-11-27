import Joi from "joi";

const userCreateSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
});


const userUpdateSchema = Joi.object({
    fullname: Joi.string().optional(),
    password: Joi.string().optional(),
    phone: Joi.string().optional(),
    isActive: Joi.boolean().optional()
}).min(1);

export { userCreateSchema, userUpdateSchema };