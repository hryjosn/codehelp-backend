import bcrypt from "bcrypt"
import bodyParser from "body-parser"
import express, { Express } from "express"
import path from "path"
import request from "supertest"
import { addMentor } from "~/Mentor/mentor.model"
import mentorRouter from "~/Mentor/mentor.router"
import { RESPONSE_CODE } from "~/types"
import { AVAILABLE_TIME, MENTOR_ONE } from "./utils/constant"
import { DataBase } from "./utils/db.config"
import { Mentor } from "~/db/entities/Mentor"
import { generateToken } from "~/utils/account"
import jwt from "jsonwebtoken"

let server: Express
const DB = new DataBase()
const tokenStartWithBearer = /^Bearer/
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
const MENTOR_DATA = {
  userName: "testSignUpMentor",
  email: "testSignUpMentor@gmail.com",
  password: "123456789",
  gender: "f",
  country: "TW",
  title: "123",
  company: "123",
  introduction: "123",
  phoneNumber: "0900000000",
  level: 0,
  linkedInURL: "123",
  primaryExpertise: "123",
  secondaryExpertise: "123",
  tertiaryExpertise: "123",
  education: "高雄科技大學-海事資訊科技系",
}

let mentor: Mentor
let mentorToken: string
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
    const encryptedMentorPassword = await bcrypt.hash(MENTOR_ONE.password, 10)
    mentor = await addMentor({
      ...MENTOR_ONE,
      password: encryptedMentorPassword,
    })
    mentorToken = generateToken(mentor)
    server.use("/mentor", [mentorRouter])
  } catch (error) {
    console.log(error)
    throw error
  }
})

afterAll(() => {
  DB.destroy()
})

describe("Mentor router POST: Mentor sign-up", () => {
  it("(o) Should return mentor data and token when sign-up is successfully.", async () => {
    const res = await request(server)
      .post("/mentor/signUp")
      .field(MENTOR_DATA)
      .set({
        "Content-Type": "application/json",
      })
      .field("disciplines[0]", "first disciplines")
      .field("disciplines[1]", "second disciplines")
      .field("skills[0]", "first skill")
      .field("skills[1]", "second skill")
      .field("tools[0]", "first tools")
      .attach("avatar", path.join(__dirname, "/mock/Dog.png"))

    expect(res.status).toBe(200)
    expect(res.body.status).toBe("ok")
    expect(res.body.newMentor).toBeDefined()
    expect(res.body.token).toMatch(tokenStartWithBearer)
    expect(res.body.password).toBeUndefined()
  })

  it("(o) Should return an error with response code 4003 when user email has been created.", async () => {
    const res = await request(server)
      .post("/mentor/signUp")
      .field(MENTOR_DATA)
      .set({
        "Content-Type": "application/json",
      })
      .field("disciplines[0]", "first disciplines")
      .field("disciplines[1]", "second disciplines")
      .field("skills[0]", "first skill")
      .field("skills[1]", "second skill")
      .field("tools[0]", "first tools")
      .attach("avatar", path.join(__dirname, "/mock/Dog.png"))

    expect(res.status).toBe(403)
    expect(res.body.code).toBe(RESPONSE_CODE.DATA_DUPLICATE)
  })

  it("(o) Should return an error with response code 4003 when user email has been created.", async () => {
    const res = await request(server)
      .post("/mentor/signUp")
      .field(MENTOR_DATA)
      .set({
        "Content-Type": "application/json",
      })
      //Missing data: disciplines, skills
      .field("tools[0]", "first tools")
      .attach("avatar", path.join(__dirname, "/mock/Dog.png"))

    expect(res.status).toBe(422)
    expect(res.body.code).toBe(RESPONSE_CODE.VALIDATE_ERROR)
  })
})

/*
 *  [POST] Mentor sign-up
 *
 *  (o) Should return mentor data and token when sign-up is successfully.
 *
 *  (x) Should return an error with response code 4003 when user email has been created.
 *
 *  (x) Should return an error with response code 4001 when the request body is missing the required data.
 *
 */

describe("Mentor router GET: Mentor List", () => {
  it("(o) Should return mentor list when requested successfully.", async () => {
    const res = await request(server)
      .get("/mentor/list")
      .query({ page: 1, count: 10 })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe("ok")
    expect(res.body.mentorList).toBeDefined()
    expect(res.body.total).toBe(2)
  })

  it("(o) Should return filtered mentor list when the keyword is defined.", async () => {
    const res = await request(server)
      .get("/mentor/list")
      .query({ page: 1, count: 10, keyword: "SignUp" })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe("ok")
    expect(res.body.mentorList.length).toBe(1)
    expect(res.body.total).toBe(1)
  })

  it("(o) Should return empty array when the keyword not found.", async () => {
    const res = await request(server)
      .get("/mentor/list")
      .query({ page: 1, count: 10, keyword: "test for empty array" })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe("ok")
    expect(res.body.mentorList.length).toBe(0)
    expect(res.body.total).toBe(0)
  })

  it("(x) Should return an error with response code 4001 when the pagination params is error.", async () => {
    const res = await request(server)
      .get("/mentor/list")
      // Missing count parameter
      .query({ page: 1 })

    expect(res.status).toBe(422)
    expect(res.body.code).toBe(RESPONSE_CODE.VALIDATE_ERROR)
  })
})

/*
 *  [GET] Mentor List
 *
 *  (o) Should return mentor list when requested successfully.
 *
 *  (o) Should return filtered mentor list when the keyword is defined.
 *
 *  (o) Should return empty array when the keyword not found.
 *
 *  (x) Should return an error with response code 4001 when the pagination params is error.
 *
 */

describe("Mentor router PUT: Update Mentor Available Time", () => {
  it("(o) Should return mentor available time when requested successfully.", async () => {
    const res = await request(server)
      .put("/mentor/updateAvailableTime")
      .send({
        availableTime: AVAILABLE_TIME,
      })
      .set("Authorization", mentorToken)

    expect(res.status).toBe(200)
    expect(res.body.status).toBe("ok")
    expect(res.body.id).toBe(mentor.id)
    expect(res.body.userName).toBe(mentor.userName)
    expect(res.body.availableTime).toBe(AVAILABLE_TIME)
  })

  it("(x) Should return an error with response code 4002 when the mentor is not exists.", async () => {
    const res = await request(server)
      .put("/mentor/updateAvailableTime")
      .send({
        availableTime: AVAILABLE_TIME,
      })
      .set("Authorization", NOT_EXISTS_TOKEN)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.USER_DATA_ERROR)
  })

  it("(x) Should return an error with response code 4001 when the available time is incorrect.", async () => {
    const res = await request(server)
      .put("/mentor/updateAvailableTime")
      .send({
        //Missing endAt
        availableTime: [
          {
            weekly: 1,
            startAt: {
              hours: 6,
              minutes: 30,
            },
          },
        ],
      })
      .set("Authorization", mentorToken)

    expect(res.status).toBe(422)
    expect(res.body.code).toBe(RESPONSE_CODE.VALIDATE_ERROR)
  })
})

/*
 *  [PUT] Update Mentor Available Time
 *
 *  (o) Should return mentor available time when requested successfully.
 *
 *  (x) Should return an error with response code 4002 when the mentor is not exists.
 *
 *  (x) Should return an error with response code 4001 when the data of available time is incorrect.
 *
 */
