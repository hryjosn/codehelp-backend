import Joi from "joi"

export default {
  signUp: Joi.object({
    body: Joi.object().keys({
      userName: Joi.string()
        .regex(/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/)
        .required()
        .min(5)
        .max(30)
        .lowercase(),
      password: Joi.string().min(8).max(30).required(),
      email: Joi.string().email().trim().required().max(254).messages({
        "string.base": "{{#key}} should be a type of email",
        "string.max": "{{#key}} have a maximum length of {{#limit}}",
        "string.empty": "{{#key}} cannot be an empty field",
        "string.email": "{{#key}} type is incorrect",
        "any.required": "{{#key}} is a required field",
      }),
      avatar: Joi.string().required().max(254),
    }),
  }),
}
