import { IMemberModel } from "~/Member/types"
import { IMentorModel } from "~/Mentor/types"

const MENTOR_DETAIL = {
  password: "123456789",
  avatar: "fake avatar url",
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
  disciplines: ["123"],
  skills: ["123"],
  tools: ["123"],
  quickReply: false,
  education: "高雄科技大學-海事資訊科技系",
}

export const MENTOR_ONE: IMentorModel = {
  userName: "mentor",
  email: "mentor@gmail.com",
  ...MENTOR_DETAIL,
}

export const MENTOR_TWO: IMentorModel = {
  userName: "mentor2",
  email: "mentor2@gmail.com",
  ...MENTOR_DETAIL,
}

const MEMBER_DETAIL = {
  password: "123456789",
  avatar: "fake avatar url",
  gender: "f",
  country: "TW",
  title: "123",
  company: "123",
  phoneNumber: "0900000000",
  introduction: "123",
  level: 0,
  fieldOfWork: ["123"],
}

export const MEMBER: IMemberModel = {
  userName: "member",
  email: "member@gmail.com",
  ...MEMBER_DETAIL,
}

export const AVAILABLE_TIME = [
  {
    weekly: 1,
    startAt: {
      hours: 6,
      minutes: 30,
    },
    endAt: {
      hours: 19,
      minutes: 30,
    },
  },
  {
    weekly: 2,
    startAt: {
      hours: 10,
      minutes: 0,
    },
    endAt: {
      hours: 15,
      minutes: 30,
    },
  },
]
