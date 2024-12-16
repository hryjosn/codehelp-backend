import { IApi, RESPONSE_CODE } from "~/types"
import FeatureError from "~/utils/FeatureError"
import { newBooking } from "./booking.feature"

export const newBookingController: IApi = async (req, res) => {
  try {
    const { problem, bookingTime, userId } = req.body
    const { mentorId } = req.params

    const booking = await newBooking({
      mentorId,
      memberId: userId,
      problem,
      bookingTime,
    })
    res.status(200).send({
      status: "ok",
      booking,
    })
  } catch (error) {
    if (error instanceof FeatureError) {
      res.status(error.serverStatus).send({
        code: error.code,
        message: error.message,
      })
    } else {
      res.status(500).send({
        code: RESPONSE_CODE.UNKNOWN_ERROR,
        message: error,
      })
      throw error
    }
  }
}
