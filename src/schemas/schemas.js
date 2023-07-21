import Joi from "joi";


export const pollSchema = Joi.object({
    title: Joi.string().required(),
    expireAt: Joi.date().format('YYYY-MM-DD HH:mm')
})

export const choiceSchema = Joi.object({
    title: Joi.string().required(),
    pollId: Joi.string().required()
})


export const voteSchema = Joi.object({
    createdAt: Joi.date().format('YYYY-MM-DD HH:mm').required(),
    choiceId: Joi.date().format('YYYY-MM-DD HH:mm').required()
})
