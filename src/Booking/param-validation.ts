import Joi from "joi"

export const newBookingSchema = Joi.object({
  body: Joi.object().keys({
    mentorId: Joi.string().uuid().required(),
    problem: Joi.string().required(),
    bookingTime: Joi.date().required(),
  }),
})

export const getBookingRecords = Joi.object({
  body: Joi.object().keys({
    id: Joi.string().uuid().required(),
    page: Joi.number().min(1).required(),
    count: Joi.number().min(10).max(10).required(),
  }),
})
