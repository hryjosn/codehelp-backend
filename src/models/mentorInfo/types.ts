import { IUser } from "../user/types"

export interface IUserWithMentorInfo extends IUser {
  yearsOfExperience: string
  linkedURL: string
  primaryExpertise: string
  secondaryExpertise?: string
  tertiaryExpertise?: string
  disciplines: string[]
  skills: string[]
  tools: string[]
}
