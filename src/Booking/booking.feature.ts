import { findMentorBy } from "~/Mentor/mentor.model"
import { BOOKING_STATUS_LABELS, INewBookingFeature } from "./types"
import { findMemberBy } from "~/Member/member.model"
import checkBookingTimeIsAvailable from "~/utils/checkBookingTimeIsAvailable"
import FeatureError from "~/utils/FeatureError"
import { RESPONSE_CODE } from "~/types"
import { addBooking, checkIsBooked } from "./booking.model"

export const newBooking = async ({
  mentorId,
  memberId,
  problem,
  bookingTime,
}: INewBookingFeature) => {
  try {
    const findMentor = findMentorBy({ id: mentorId })
    const findMember = findMemberBy({ id: memberId })
    const [mentor, member] = await Promise.all([findMentor, findMember])

    if (!mentor || !member) {
      throw new FeatureError(
        401,
        RESPONSE_CODE.USER_DATA_ERROR,
        "The mentor or member is not exists",
      )
    }

    if (mentor.availableTime!.length === 0) {
      throw new FeatureError(
        401,
        RESPONSE_CODE.NO_PERMISSION,
        "This mentor does not set available booking time yet.",
      )
    }

    const isAvailable = checkBookingTimeIsAvailable({
      availableTime: mentor.availableTime!,
      bookingTime,
    })
    if (!isAvailable) {
      throw new FeatureError(
        401,
        RESPONSE_CODE.NO_PERMISSION,
        "The selected time is not in this mentor available time.",
      )
    }

    const isBooked = await checkIsBooked({ mentorId: mentor.id!, bookingTime })
    if (isBooked) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.DATA_DUPLICATE,
        "The selected time already be booked.",
      )
    }
    const newBooking = await addBooking({
      mentor,
      member,
      problem,
      bookingTime,
    })

    return {
      ...newBooking,
      bookingStatus: BOOKING_STATUS_LABELS[newBooking.bookingStatus!],
    }
  } catch (error) {
    throw error
  }
}
