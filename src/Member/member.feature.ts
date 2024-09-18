import { IMember } from "~/Member/types"
import bcrypt from "bcrypt"
import { IAccount, RESPONSE_CODE } from "~/types"
import { generateToken } from "~/utils/account"
import { addMember, findMemberBy } from "./member.model"
import { Member } from "~/db/entities/Member"
import FeatureError from "~/utils/FeatureError"

export const save = async (
  data: IMember,
): Promise<{ newMember: Member; token: string }> => {
  try {
    const { email, password } = data
    const isEmailExist = await findMemberBy({ email })
    if (isEmailExist) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.DATA_DUPLICATE,
        `Email: ${email} has been created`,
      )
    }

    const encryptedPassword = await bcrypt.hash(password, 10)
    const newMember = await addMember({
      ...data,
      password: encryptedPassword,
    })

    const token = generateToken(newMember)
    delete newMember.password

    return { newMember, token }
  } catch (error) {
    throw error
  }
}

export const login = async ({
  email,
  password,
}: IAccount): Promise<{ member: Member; token: string }> => {
  try {
    const member = await findMemberBy({ email })
    if (!member) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User's name or password is not correct",
      )
    }

    const isPasswordCorrect = await bcrypt.compare(password!, member.password!)
    if (!isPasswordCorrect) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User's name or password is not correct",
      )
    }

    const token = generateToken(member)
    delete member.password
    return {
      member,
      token,
    }
  } catch (error) {
    throw error
  }
}
