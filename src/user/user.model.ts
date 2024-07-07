import { User } from "../entities/User"
import { ISignUp } from "./types"
export default class UserModel {
  async addOne(params: ISignUp) {
    const { userName, password, avatar, email, phoneNumber } = params
    const newUser = new User()
    newUser.user_name = userName
    newUser.password = password
    newUser.email = email
    newUser.avatar = avatar
    newUser.phone_number = phoneNumber
    const newUserData = await newUser.save()
    return newUserData
  }

  findOne({ userName, email }: { userName?: string; email?: string }) {
    return User.findOne({
      where: [{ user_name: userName }, { email }],
    })
  }
}
