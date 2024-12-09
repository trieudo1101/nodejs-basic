import Joi from "joi";

const categoryCreateSchema = Joi.object({
  categoryName: Joi.string().required(),
});

export { categoryCreateSchema };
