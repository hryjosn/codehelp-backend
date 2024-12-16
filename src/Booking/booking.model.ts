import { Booking } from "~/db/entities/Booking"
import { ICheckIsBooked, INewBookingModel } from "./types"

export const addBooking = ({
  mentor,
  member,
  problem,
  bookingTime,
}: INewBookingModel) => {
  const newBooking = new Booking()
  newBooking.mentor = mentor
  newBooking.member = member
  newBooking.problem = problem
  newBooking.bookingAt = bookingTime
  return newBooking.save()
}

export const checkIsBooked = ({ mentorId, bookingTime }: ICheckIsBooked) => {
  return Booking.existsBy({
    mentor: { id: mentorId },
    bookingAt: bookingTime,
  })
}
