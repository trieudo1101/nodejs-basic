import Joi from 'joi';

const expenseCreateSchema = Joi.object({
    expenseName: Joi.string().required(),
    money: Joi.number().precision(2).positive().required(),
    image: Joi.string().optional(),
    note: Joi.string().optional(),
    categoryId: Joi.number().integer().allow(null).optional(),
    typeId: Joi.number().integer().allow(null).optional()
});

const expenseUpdateSchema = Joi.object({
    expenseName: Joi.string().optional(),
    money: Joi.number().precision(2).positive().optional(),
    image: Joi.string().optional(),
    note: Joi.string().optional(),
    categoryId: Joi.number().integer().allow(null).optional(),
    typeId: Joi.number().integer().allow(null).optional()
}).min(1);

export { expenseCreateSchema, expenseUpdateSchema };