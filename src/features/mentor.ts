import bcrypt from "bcrypt"
import { IAccount, RESPONSE_CODE } from "~/types"
import { generateToken } from "~/utils/account"
import { addMentor, findMentorBy } from "~/models/mentor"
import { IMentor } from "~/models/mentor/types"
import { Mentor } from "~/db/entities/Mentor"
import FeatureError from "~/utils/FeatureError"

export const save = async (
  data: IMentor,
): Promise<{ newMentor: Mentor; token: string }> => {
  try {
    const { email, password } = data

    const isEmailExist = await findMentorBy({ email })
    if (isEmailExist) {
      throw new FeatureError(
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

export const login = async ({
  email,
  password,
}: IAccount): Promise<{ mentor: Mentor; token: string }> => {
  try {
    const mentor = await findMentorBy({ email })
    if (!mentor) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User's name or password is not correct",
      )
    }

    const isPasswordCorrect = await bcrypt.compare(password!, mentor.password!)
    if (!isPasswordCorrect) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User's name or password is not correct",
      )
    }

    const token = generateToken(mentor)
    return {
      mentor,
      token,
    }
  } catch (error) {
    throw error
  }
}

export const getInfo = async ({ id }: { id: string }): Promise<Mentor> => {
  try {
    const mentor = await findMentorBy({ id })

    if (!mentor) {
      throw new FeatureError(
        404,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User not found.",
      )
    }
    return mentor
  } catch (error) {
    throw error
  }
}
