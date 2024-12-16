import { Member } from "~/db/entities/Member"
import { Mentor } from "~/db/entities/Mentor"

export enum BOOKING_STATUS {
  PENDING = 0,
  REJECTED = 1,
  ACCEPTED = 2,
  COMPLETED = 3,
}

export const BOOKING_STATUS_LABELS: Record<BOOKING_STATUS | number, string> = {
  [BOOKING_STATUS.PENDING]: "申請中",
  [BOOKING_STATUS.REJECTED]: "已拒絕",
  [BOOKING_STATUS.ACCEPTED]: "已接受",
  [BOOKING_STATUS.COMPLETED]: "已結束",
}

export interface INewBookingModel {
  mentor: Mentor
  member: Member
  problem: string
  bookingTime: Date
}

export interface INewBookingFeature {
  mentorId: string
  memberId: string
  problem: string
  bookingTime: Date
}

export interface ICheckIsBooked {
  mentorId: string
  bookingTime: Date
}
