import Joi from "joi";

const schema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  preco: Joi.number().required(),
  estoque: Joi.number().positive().integer().required(),
});

export default schema;
