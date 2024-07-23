import { IUser } from "../user/types"

export interface IUserWithMemberInfo extends IUser {
  levelOfExperience: string
  fieldOfWork: string[]
}
