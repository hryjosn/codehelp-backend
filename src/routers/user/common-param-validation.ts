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
