import { Mentor } from "~/db/entities/Mentor"
import { findMemberBy } from "~/Member/member.model"
import { findMentorBy } from "~/Mentor/mentor.model"
import { IAccount, RESPONSE_CODE } from "~/types"
import FeatureError from "~/utils/FeatureError"
import bcrypt from "bcrypt"
import { generateToken } from "~/utils/account"
import { ILoginResult, USER_IDENTITY } from "./types"

export const login = async ({
  email,
  password,
}: IAccount): Promise<ILoginResult> => {
  try {
    const findMentor = findMentorBy({ email })
    const findMember = findMemberBy({ email })
    const [mentor, member] = await Promise.all([findMentor, findMember])

    const user = mentor || member
    if (!user) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User's name or password is not correct",
      )
    }

    const isPasswordCorrect = await bcrypt.compare(password!, user.password!)
    if (!isPasswordCorrect) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User's name or password is not correct",
      )
    }
    delete user.password
    const token = generateToken(user)
    const identity =
      user instanceof Mentor ? USER_IDENTITY.MENTOR : USER_IDENTITY.MEMBER
    return {
      identity,
      user,
      token,
    }
  } catch (error) {
    throw error
  }
}
