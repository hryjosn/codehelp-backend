import { IPagination } from "~/types"

export interface IMentor {
  userName: string
  email: string
  password: string
  gender: string
  country: string
  title: string
  company: string
  phoneNumber: string
  emailOtp?: boolean
  introduction: string
  level: number
  linkedInURL: string
  primaryExpertise: string
  secondaryExpertise?: string
  tertiaryExpertise?: string
  disciplines: string[]
  skills: string[]
  tools: string[]
  quickReply: boolean
}

export interface IMentorRequestBody extends IMentor {
  avatar: Express.Multer.File[]
}

export interface IMentorModel extends IMentor {
  avatar: string
}

export interface IKeywordPagination extends IPagination {
  keyword?: string
}
