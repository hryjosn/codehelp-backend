import bodyParser from "body-parser"
import express, { Express } from "express"
import request from "supertest"
import { RESPONSE_CODE } from "~/types"
import { DataBase } from "./utils/db.config"
import { addMentor, updateAvailableTime } from "../src/Mentor/mentor.model"
import bcrypt from "bcrypt"
import {
  AVAILABLE_TIME,
  MEMBER,
  MENTOR_ONE,
  MENTOR_TWO,
} from "./utils/constant"
import { addMember } from "../src/Member/member.model"
import { Member } from "~/db/entities/Member"
import { Mentor } from "~/db/entities/Mentor"
import { generateToken } from "~/utils/account"
import jwt from "jsonwebtoken"
import { BOOKING_STATUS, BOOKING_STATUS_LABELS } from "~/Booking/types"
import bookingRouter from "~/Booking/booking.router"

let server: Express
const DB = new DataBase()
const CONTENT = "The booking feature testing."
const NOT_EXISTS_ID = "09e7c567-05dd-4cb2-b789-df0344401f88"
const NOT_EXISTS_TOKEN =
  "Bearer " +
  jwt.sign(
    {
      userName: "none",
      email: "none",
      id: NOT_EXISTS_ID,
    },
    String(process.env.TOKEN),
    { expiresIn: "30 day" },
  )
let mentor: Mentor
let mentor_two: Mentor
let member: Member
let memberToken: string
const BOOKING_TIMESTAMP = "2024/12/23 11:00"
const NOT_AVAILABLE_BOOKING_TIMESTAMP = "2024/12/23 20:00"
beforeAll(async () => {
  try {
    await DB.setup()
    server = express()
    server.use(bodyParser.json())
    server.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    )
    server.use("/member", [bookingRouter])
    const encryptedMentorPassword = await bcrypt.hash(MENTOR_ONE.password, 10)
    mentor = await addMentor({
      ...MENTOR_ONE,
      password: encryptedMentorPassword,
    })
    await updateAvailableTime({
      mentorId: mentor.id!,
      availableTime: AVAILABLE_TIME,
    })
    const encryptedMentorTWOPassword = await bcrypt.hash(
      MENTOR_TWO.password,
      10,
    )
    mentor_two = await addMentor({
      ...MENTOR_TWO,
      password: encryptedMentorTWOPassword,
    })

    const encryptedMemberPassword = await bcrypt.hash(MEMBER.password, 10)
    member = await addMember({
      ...MEMBER,
      password: encryptedMemberPassword,
    })
    memberToken = generateToken(member)
  } catch (error) {
    console.log(error)
    throw error
  }
})

afterAll(() => {
  DB.destroy()
})

describe("Booking router Post: Create a booking", () => {
  it("(o) Should return the booking detail when requested successfully.", async () => {
    const res = await request(server)
      .post(`/member/booking/${mentor.id}`)
      .send({
        problem: CONTENT,
        bookingTime: BOOKING_TIMESTAMP,
      })
      .set("Authorization", memberToken)

    expect(res.status).toBe(200)
    expect(res.body.status).toBe("ok")
    expect(res.body.booking.mentor.id).toBe(mentor.id)
    expect(res.body.booking.mentor.userName).toBe(mentor.userName)
    expect(res.body.booking.member.id).toBe(member.id)
    expect(res.body.booking.member.userName).toBe(member.userName)
    expect(res.body.booking.problem).toBe(CONTENT)
    expect(res.body.booking.bookingAt).toBeDefined()
    expect(res.body.booking.bookingStatus).toBe(
      BOOKING_STATUS_LABELS[BOOKING_STATUS.PENDING],
    )
  })

  it("(x) Should return an error with response code 4003 when the booking time is already booked.", async () => {
    const res = await request(server)
      .post(`/member/booking/${mentor.id}`)
      .send({
        problem: CONTENT,
        bookingTime: BOOKING_TIMESTAMP,
      })
      .set("Authorization", memberToken)
    expect(res.status).toBe(403)
    expect(res.body.code).toBe(RESPONSE_CODE.DATA_DUPLICATE)
  })

  it("(x) Should return an error with response code 4005 when the booking time is not available.", async () => {
    const res = await request(server)
      .post(`/member/booking/${mentor.id}`)
      .send({
        problem: CONTENT,
        bookingTime: NOT_AVAILABLE_BOOKING_TIMESTAMP,
      })
      .set("Authorization", memberToken)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.NO_PERMISSION)
  })

  it("(x) Should return an error with response code 4005 when the mentor does not set available booking time yet.", async () => {
    const res = await request(server)
      .post(`/member/booking/${mentor_two.id}`)
      .send({
        problem: CONTENT,
        bookingTime: BOOKING_TIMESTAMP,
      })
      .set("Authorization", memberToken)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.NO_PERMISSION)
  })

  it("(x) Should return an error with response code 4002 when member not found.", async () => {
    const res = await request(server)
      .post(`/member/booking/${mentor.id}`)
      .send({
        problem: CONTENT,
        bookingTime: BOOKING_TIMESTAMP,
      })
      .set("Authorization", NOT_EXISTS_TOKEN)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.USER_DATA_ERROR)
  })

  it("(x) Should return an error with response code 4002 when mentor not found.", async () => {
    const res = await request(server)
      .post(`/member/booking/${NOT_EXISTS_ID}`)
      .send({
        problem: CONTENT,
        bookingTime: BOOKING_TIMESTAMP,
      })
      .set("Authorization", memberToken)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.USER_DATA_ERROR)
  })

  it("(x) Should return an error with response code 4001 when the booking data is missing.", async () => {
    const res = await request(server)
      .post(`/member/booking/${mentor.id}`)
      //Missing problem
      .send({
        bookingTime: BOOKING_TIMESTAMP,
      })
      .set("Authorization", memberToken)

    expect(res.status).toBe(422)
    expect(res.body.code).toBe(RESPONSE_CODE.VALIDATE_ERROR)
  })
})

/*
 *  [POST] Create a Booking
 *
 * (o) Should return the booking detail when requested successfully.
 *
 * (x) Should return an error with response code 4003 when the booking time is already booked.
 *
 * (x) Should return an error with response code 4005 when the booking time is not available.
 *
 * (x) Should return an error with response code 4005 when the mentor does not set available booking time yet.
 *
 * (x) Should return an error with response code 4002 when member not found.
 *
 * (x) Should return an error with response code 4002 when mentor not found.
 *
 * (x) Should return an error with response code 4001 when the booking data is missing.
 *
 */
