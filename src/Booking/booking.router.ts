import express from "express"
import auth from "~/middleware/auth"

import { validation } from "~/middleware/validation"
import { newBookingSchema } from "./param-validation"
import { newBookingController } from "./booking.controller"

const router = express.Router()

router
  .route("/booking/:mentorId")
  .post(validation(newBookingSchema), auth, newBookingController)

export default router
