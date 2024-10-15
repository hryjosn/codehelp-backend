import { Member } from "~/db/entities/Member"
import { Mentor } from "~/db/entities/Mentor"

export interface IChatroomModel {
  mentor: Mentor
  member: Member
}
