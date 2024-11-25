import { Member } from "~/db/entities/Member"
import { Mentor } from "~/db/entities/Mentor"

export interface ILoginResult {
  identity: USER_IDENTITY
  user: Mentor | Member
  token: string
}

export enum USER_IDENTITY {
  MENTOR = "mentor",
  MEMBER = "member",
}
