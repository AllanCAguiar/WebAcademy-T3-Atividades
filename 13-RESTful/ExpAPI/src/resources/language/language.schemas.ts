import Joi from "joi";


export const languageSchema = Joi.object().keys({
    lang: Joi.valid("pt-BR", "en-US").required()
})