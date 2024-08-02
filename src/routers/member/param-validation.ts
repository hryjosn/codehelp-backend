import Joi from "joi"

export const signUpSchema = Joi.object({
  body: Joi.object().keys({
    userName: Joi.string().required().min(3).max(30).lowercase(),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().trim().required().max(320).messages({
      "string.base": "{{#key}} should be a type of email",
      "string.max": "{{#key}} have a maximum length of {{#limit}}",
      "string.empty": "{{#key}} cannot be an empty field",
      "string.email": "{{#key}} type is incorrect",
      "any.required": "{{#key}} is a required field",
    }),
    avatar: Joi.string().required().max(256),
    gender: Joi.string().required().max(1).min(1),
    country: Joi.string().required().max(2).min(2).uppercase(),
    title: Joi.string().required().max(100),
    company: Joi.string().required().max(100),
    introduction: Joi.string().required().max(500),
    phoneNumber: Joi.string().required().max(20),
    level: Joi.string().required().max(30),
    fieldOfWork: Joi.array().required().min(1).max(5),
  }),
})
