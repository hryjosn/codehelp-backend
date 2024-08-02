import bcrypt from "bcrypt"
import { GENDER, RESPONSE_CODE } from "~/types"
import { generateToken } from "~/utils/account"
import { addMentor, findMentorBy } from "~/models/mentor"
import { IMentor } from "~/models/mentor/types"
import { Mentor } from "~/db/entities/Mentor"
import HttpError from "~/utils/HttpError"

export const save = async (
  data: IMentor,
): Promise<{ newMentor: Mentor; token: string }> => {
  try {
    const { email, password } = data
    console.log("mentor", data)

    const isEmailExist = await findMentorBy({ email })
    if (isEmailExist) {
      throw new HttpError(
        403,
        RESPONSE_CODE.DATA_DUPLICATE,
        `Email: ${email} has been created`,
      )
    }

    const encryptedPassword = await bcrypt.hash(password, 10)
    const newMentor = await addMentor({
      ...data,
      password: encryptedPassword,
    })

    const token = generateToken(newMentor)
    delete newMentor.password

    return { newMentor, token }
  } catch (error) {
    throw error
  }
}
