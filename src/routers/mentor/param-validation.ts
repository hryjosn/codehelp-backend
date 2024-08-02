import Joi from "joi"

export const accountSchema = Joi.object({
  body: Joi.object().keys({
    email: Joi.string().email().trim().required().max(254).messages({
      "string.base": "{{#key}} should be a type of email",
      "string.max": "{{#key}} have a maximum length of {{#limit}}",
      "string.empty": "{{#key}} cannot be an empty field",
      "string.email": "{{#key}} type is incorrect",
      "any.required": "{{#key}} is a required field",
    }),
    password: Joi.string().min(8).max(30).required(),
  }),
})

export const signUpSchema = Joi.object({
  body: Joi.object().keys({
    userName: Joi.string().required().min(3).max(30),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().trim().required().max(254).messages({
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
    level: Joi.number().required().max(3).min(0),
    linkedInURL: Joi.string().required().max(257),
    primaryExpertise: Joi.string().required().max(100),
    secondaryExpertise: Joi.string().required().allow("").max(100),
    tertiaryExpertise: Joi.string().required().allow("").max(100),
    disciplines: Joi.array().required().min(1),
    skills: Joi.array().required().min(1),
    tools: Joi.array().required().min(1),
  }),
})
