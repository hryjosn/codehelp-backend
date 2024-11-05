import Joi from "joi"

export const newMessageSchema = Joi.object({
  body: Joi.object().keys({
    chatroomId: Joi.string().uuid().required(),
    content: Joi.string().min(1).max(1000).required(),
  }),
})
