import { getDay, getHours, getMinutes } from "date-fns"
import { IAvailableTime } from "~/Mentor/types"

const checkBookingTimeIsAvailable = ({
  availableTime,
  bookingTime,
}: {
  availableTime: IAvailableTime[]
  bookingTime: Date
}) => {
  const availableTimeRange = availableTime.find(
    (value) => value.weekly === getDay(bookingTime),
  )

  if (!availableTimeRange) {
    return availableTimeRange
  }
  const startTimeInMinutes =
    availableTimeRange.startAt.hours * 60 + availableTimeRange.startAt.minutes

  const endTimeInMinutes =
    availableTimeRange.endAt.hours * 60 + availableTimeRange.endAt.minutes

  const bookingTimeInMinutes =
    getHours(bookingTime) * 60 + getMinutes(bookingTime)

  return (
    startTimeInMinutes <= bookingTimeInMinutes &&
    endTimeInMinutes >= bookingTimeInMinutes
  )
}

export default checkBookingTimeIsAvailable
