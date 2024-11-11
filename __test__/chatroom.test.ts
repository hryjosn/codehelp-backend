import bodyParser from "body-parser"
import express, { Express } from "express"
import request from "supertest"
import { RESPONSE_CODE } from "~/types"
import { DataBase } from "./utils/db.config"
import chatroomRouter from "../src/Chatroom/chatroom.router"
import { addMentor } from "../src/Mentor/mentor.model"
import bcrypt from "bcrypt"
import { MEMBER, MENTOR_ONE, MENTOR_TWO } from "./utils/constant"
import { addMember } from "../src/Member/member.model"
import { Member } from "~/db/entities/Member"
import { Mentor } from "~/db/entities/Mentor"
import { generateToken } from "~/utils/account"
import jwt from "jsonwebtoken"
import { add } from "~/Chatroom/chatroom.model"

let server: Express
const DB = new DataBase()
const NOT_EXISTS_ID = "09e7c567-05dd-4cb2-b789-df0344401f88"
const NOT_EXISTS_MEMBER_TOKEN =
  "Bearer " +
  jwt.sign(
    {
      userName: "none",
      email: "none",
      id: "09e7c567-05dd-4cb2-b789-df0344401f88",
    },
    String(process.env.TOKEN),
    { expiresIn: "30 day" },
  )
let mentor: Mentor
let mentorToken: string
let member: Member
let memberToken: string
let chatroomId: string

let secondMentor: Mentor
// For create the second chatroom.
let secondChatroomId: string
// For testing when the user(mentor) is not in chatroom(second chatroom).

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
    server.use("/chatroom", [chatroomRouter])
    const encryptedMentorPassword = await bcrypt.hash(MENTOR_ONE.password, 10)
    mentor = await addMentor({
      ...MENTOR_ONE,
      password: encryptedMentorPassword,
    })
    mentorToken = generateToken(mentor)

    const encryptedMemberPassword = await bcrypt.hash(MEMBER.password, 10)
    member = await addMember({
      ...MEMBER,
      password: encryptedMemberPassword,
    })
    memberToken = generateToken(member)

    const encryptedSecondMentorPassword = await bcrypt.hash(
      MENTOR_TWO.password,
      10,
    )
    secondMentor = await addMentor({
      ...MENTOR_TWO,
      password: encryptedSecondMentorPassword,
    })

    const chatroom = await add({
      mentor: secondMentor,
      member: member,
    })
    secondChatroomId = chatroom.id!
  } catch (error) {
    console.log(error)
    throw error
  }
})

afterAll(() => {
  DB.destroy()
})

describe("Chatroom router POST: Create a chatroom", () => {
  it("(o) Should return the chatroom id when the request is successful.", async () => {
    const res = await request(server)
      .post("/chatroom/create")
      .send({
        mentorId: mentor.id,
      })
      .set("Authorization", memberToken)

    expect(res.status).toBe(200)
    expect(res.body.chatroomId).toBeDefined()
    expect(res.body.status).toBe("ok")
    chatroomId = res.body.chatroomId
  })

  it("(x) Should return an error with response code 4002 when the mentor is not found.", async () => {
    const res = await request(server)
      .post("/chatroom/create")
      .send({
        mentorId: NOT_EXISTS_ID,
      })
      .set("Authorization", memberToken)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.USER_DATA_ERROR)
  })

  it("(x) Should return an error with response code 4002 when the member is not found.", async () => {
    const res = await request(server)
      .post("/chatroom/create")
      .send({
        mentorId: mentor.id,
      })
      .set("Authorization", NOT_EXISTS_MEMBER_TOKEN)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.USER_DATA_ERROR)
  })

  it("(x) Should return an error with response code 4003 when the users already have a chatroom.", async () => {
    const res = await request(server)
      .post("/chatroom/create")
      .send({
        mentorId: mentor.id,
      })
      .set("Authorization", memberToken)

    expect(res.status).toBe(403)
    expect(res.body.code).toBe(RESPONSE_CODE.DATA_DUPLICATE)
  })

  it("(x) Should return an error with response code 4001 when the request body is missing the required data.", async () => {
    const res = await request(server)
      .post("/chatroom/create")
      .set("Authorization", memberToken)

    expect(res.status).toBe(422)
    expect(res.body.code).toBe(RESPONSE_CODE.VALIDATE_ERROR)
  })
})

/*
 * [POST] Create a chatroom
 *
 * (o) Should return the chatroom id when the request is successful.
 *
 * (x) Should return an error with response code 4002 when the mentor is not found.
 *
 * (x) Should return an error with response code 4002 when the member is not found.
 *
 * (x) Should return an error with response code 4003 when the users already have a chatroom.
 *
 * (x) Should return an error with response code 4001 when the request body is missing the required data.
 */

describe("Chatroom router GET: Chatroom info", () => {
  it("(o) Should return the chatroom id and message record when the request is successful.", async () => {
    const res = await request(server)
      .get(`/chatroom/info/${chatroomId}`)
      .set("Authorization", memberToken)

    expect(res.status).toBe(200)
    expect(res.body.chatroom.id).toBeDefined()
    expect(res.body.chatroom.createdAt).toBeDefined()
    expect(res.body.chatroom.mentor).toBeDefined()
    expect(res.body.chatroom.member).toBeDefined()
    expect(res.body.chatroom.messages).toBeDefined()
  })

  it("(x) Should return an error with response code 4002 when the user is not found.", async () => {
    const res = await request(server)
      .get(`/chatroom/info/${chatroomId}`)
      .set("Authorization", NOT_EXISTS_MEMBER_TOKEN)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.USER_DATA_ERROR)
  })

  it("(x) Should return an error with response code 4004 when the chatroom is not found.", async () => {
    const res = await request(server)
      .get(`/chatroom/info/${NOT_EXISTS_ID}`)
      .set("Authorization", memberToken)

    expect(res.status).toBe(403)
    expect(res.body.code).toBe(RESPONSE_CODE.TARGET_NOT_EXISTS)
  })

  it("(x) Should return an error with response code 4004 when the user is not in this chatroom.", async () => {
    const res = await request(server)
      .get(`/chatroom/info/${secondChatroomId}`)
      .set("Authorization", mentorToken)

    expect(res.status).toBe(403)
    expect(res.body.code).toBe(RESPONSE_CODE.TARGET_NOT_EXISTS)
  })

  it("(x) Should return an error with response status 404 when query params 'chatroomId' is missing.", async () => {
    const res = await request(server)
      .get(`/chatroom/info`)
      .set("Authorization", mentorToken)

    expect(res.status).toBe(404)
  })
})

/*
 * [GET] Chatroom info
 *
 * (o) Should return the chatroom id and message record when the request is successful.
 *
 * (x) Should return an error with response code 4002 when the user is not found.
 *
 * (x) Should return an error with response code 4004 when the chatroom is not found.
 *
 * (x) Should return an error with response code 4004 when the user is not in this chatroom.
 *
 * (x) Should return an error with response status 404 when query params 'chatroomId' is missing.
 *
 */

describe("Chatroom router GET: Chatroom list", () => {
  it("(o) Should return the chatroom list when the request is successful.", async () => {
    const res = await request(server)
      .get("/chatroom/list")
      .query({ page: 1, count: 10 })
      .set("Authorization", memberToken)

    expect(res.status).toBe(200)
    expect(res.body.chatroomList).toBeDefined()
    expect(res.body.chatroomList.length).toBeLessThanOrEqual(10)
    expect(res.body.total).toBeGreaterThanOrEqual(0)
  })

  it("(x) Should return an error with response code 4002 when the user is not found.", async () => {
    const res = await request(server)
      .get("/chatroom/list")
      .query({ page: 1, count: 10 })
      .set("Authorization", NOT_EXISTS_MEMBER_TOKEN)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.USER_DATA_ERROR)
  })

  it("(x) Should return an error with response code 4001 when the pagination params is missing.", async () => {
    const res = await request(server)
      .get("/chatroom/list")
      .set("Authorization", NOT_EXISTS_MEMBER_TOKEN)

    expect(res.status).toBe(422)
    expect(res.body.code).toBe(RESPONSE_CODE.VALIDATE_ERROR)
  })
})

/*
 * [GET] Chatroom list
 *
 * (o) Should return the chatroom list when the request is successful.
 *
 * (x) Should return an error with response code 4002 when the user is not found.
 *
 * (x) Should return an error with response code 4001 when the pagination params is missing.
 *
 */

describe("Chatroom router DELETE: Delete the chatroom", () => {
  it("(o) Should return the status with 'ok' when the request is successful.", async () => {
    const res = await request(server)
      .delete(`/chatroom/delete/${chatroomId}`)
      .set("Authorization", memberToken)

    expect(res.status).toBe(200)
    expect(res.body.status).toBe("ok")
    expect(res.body.message).toBe(`Chatroom ${chatroomId} is deleted`)
  })

  it("(o) [GET] Should return an error with response code 4004 when the chatroom is not found after deletion.", async () => {
    const res = await request(server)
      .get(`/chatroom/info/${chatroomId}`)
      .set("Authorization", memberToken)

    expect(res.status).toBe(403)
    expect(res.body.code).toBe(RESPONSE_CODE.TARGET_NOT_EXISTS)
  })

  it("(x) Should return an error with response code 4002 when the user is not found.", async () => {
    const res = await request(server)
      .delete(`/chatroom/delete/${chatroomId}`)
      .set("Authorization", NOT_EXISTS_MEMBER_TOKEN)

    expect(res.status).toBe(401)
    expect(res.body.code).toBe(RESPONSE_CODE.USER_DATA_ERROR)
  })

  it("(x) Should return an error with response code 4004 when the chatroom is not found.", async () => {
    const res = await request(server)
      .delete(`/chatroom/delete/${NOT_EXISTS_ID}`)
      .set("Authorization", memberToken)

    expect(res.status).toBe(403)
    expect(res.body.code).toBe(RESPONSE_CODE.TARGET_NOT_EXISTS)
  })

  it("(x) Should return an error with response code 4004 when the user is not in this chatroom.", async () => {
    const res = await request(server)
      .delete(`/chatroom/delete/${secondChatroomId}`)
      .set("Authorization", mentorToken)

    expect(res.status).toBe(403)
    expect(res.body.code).toBe(RESPONSE_CODE.TARGET_NOT_EXISTS)
  })

  it("(x) Should return an error with response status 404 when query params 'chatroomId' is missing.", async () => {
    const res = await request(server)
      .delete(`/chatroom/delete`)
      .set("Authorization", mentorToken)

    expect(res.status).toBe(404)
  })
})

/*
 * [DELETE] Chatroom list
 *
 * (o) Should return the status with 'ok' when the request is successful.
 *
 * (o) [GET] Should return an error with response code 4004 when the chatroom is not found after deletion.
 *
 * (x) Should return an error with response code 4002 when the user is not found.
 *
 * (x) Should return an error with response code 4004 when the chatroom is not found.
 *
 * (x) Should return an error with response code 4004 when the user is not in this chatroom.
 *
 * (x) Should return an error with response status 404 when query params 'chatroomId' is missing.
 *
 */
