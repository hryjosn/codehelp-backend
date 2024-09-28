import Joi from "joi"
import { countryCodes } from "~/utils/country"

export const signUpSchema = Joi.object({
  body: Joi.object().keys({
    userName: Joi.string().required().min(3).max(30),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().trim().required().max(320),
    avatar: Joi.array().required(),
    gender: Joi.string().valid("m", "f", "n").required(),
    country: Joi.string()
      .valid(...countryCodes)
      .required()
      .uppercase(),
    title: Joi.string().required().max(100),
    company: Joi.string().required().max(100),
    introduction: Joi.string().required().max(500),
    phoneNumber: Joi.string().required().max(10),
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

export const getMentorInfoSchema = Joi.object({
  body: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
})
