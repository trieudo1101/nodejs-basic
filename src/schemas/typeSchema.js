import Joi from "joi";

const typeCreateSchema = Joi.object({
    typeName: Joi.string().required()
});

export { typeCreateSchema };