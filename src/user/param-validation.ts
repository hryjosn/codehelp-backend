import Joi from "joi"

export default {
  login: Joi.object({
    body: Joi.object().keys({
      userName: Joi.string()
        .regex(/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/)
        .required()
        .min(5)
        .max(30)
        .lowercase(),
      password: Joi.string().min(8).max(30).required(),
    }),
  }),
}

export const mentorSignUpSchema = Joi.object({
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
    avatar: Joi.string().required().max(150),
    gender: Joi.string().required().max(30),
    country: Joi.string().required().max(30),
    title: Joi.string().required().max(100),
    company: Joi.string().required().max(100),
    introduction: Joi.string().required().max(500),
    phoneNumber: Joi.string().required().max(20),
    mentorInfo: Joi.object()
      .keys({
        yearsOfExperience: Joi.string().required().max(5),
        linkedURL: Joi.string().required().max(257),
        primaryExpertise: Joi.string().required().max(100),
        secondaryExpertise: Joi.string().required().allow("").max(100),
        tertiaryExpertise: Joi.string().required().allow("").max(100),
        disciplines: Joi.array().required().min(1),
        skills: Joi.array().required().min(1),
        tools: Joi.array().required().min(1),
      })
      .required(),
  }),
})

export const memberSignUpSchema = Joi.object({
  body: Joi.object().keys({
    userName: Joi.string().required().min(5).max(30).lowercase(),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().trim().required().max(254).messages({
      "string.base": "{{#key}} should be a type of email",
      "string.max": "{{#key}} have a maximum length of {{#limit}}",
      "string.empty": "{{#key}} cannot be an empty field",
      "string.email": "{{#key}} type is incorrect",
      "any.required": "{{#key}} is a required field",
    }),
    avatar: Joi.string().required().max(150),
    gender: Joi.string().required().max(30),
    country: Joi.string().required().max(30),
    title: Joi.string().required().max(100),
    company: Joi.string().required().max(100),
    introduction: Joi.string().required().max(500),
    phoneNumber: Joi.string().required().max(20),
    memberInfo: Joi.object()
      .keys({
        levelOfExperience: Joi.string().required().max(30),
        fieldOfWork: Joi.array().required().min(1).max(5),
      })
      .required(),
  }),
})
