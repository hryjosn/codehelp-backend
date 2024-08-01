import { IMember } from "~/models/member/types"
import bcrypt from "bcrypt"
import { RESPONSE_CODE } from "~/types"
import { generateToken } from "~/utils/account"
import { addMember, findMemberBy } from "~/models/member"
import { Member } from "~/db/entities/Member"
import HttpError from "~/utils/httpError"

export const save = async (
  data: IMember,
): Promise<{ newMember: Member; token: string }> => {
  try {
    const { email, password } = data
    const isEmailExist = await findMemberBy({ email })
    if (isEmailExist) {
      throw new HttpError(
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
