import Joi from "joi";

export const pollSchema = Joi.object({
    title: Joi.string().required(),
    expireAt: Joi.string().optional().allow('')
})

export const choiceSchema = Joi.object({
    title: Joi.string().required(),
    pollId: Joi.string().required()
})