import bcrypt from "bcrypt"
import { IPagination, RESPONSE_CODE } from "~/types"
import { generateToken } from "~/utils/account"
import { addMentor, findMany, findMentorBy } from "./mentor.model"
import { IMentorRequestBody } from "~/Mentor/types"
import { Mentor } from "~/db/entities/Mentor"
import FeatureError from "~/utils/FeatureError"
import { parseImageUrl, uploadFiles } from "~/utils/assetHelper"

export const save = async (
  data: IMentorRequestBody,
): Promise<{ newMentor: Mentor; token: string }> => {
  try {
    const { email, password, avatar } = data

    const isEmailExist = await findMentorBy({ email })
    if (isEmailExist) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.DATA_DUPLICATE,
        `Email: ${email} has been created`,
      )
    }

    const result = await uploadFiles([avatar[0]])
    const [avatarImageId] = result

    const encryptedPassword = await bcrypt.hash(password, 10)
    const newMentor = await addMentor({
      ...data,
      avatar: parseImageUrl(avatarImageId),
      password: encryptedPassword,
    })

    const token = generateToken(newMentor)
    delete newMentor.password

    return { newMentor, token }
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
    delete mentor.password
    return mentor
  } catch (error) {
    throw error
  }
}

export const getList = async ({
  page,
  count,
}: IPagination): Promise<{ mentorList: Mentor[]; total: number }> => {
  try {
    const skip = (page - 1) * count
    const [mentorList, total] = await findMany({ count, skip })

    return { mentorList, total }
  } catch (error) {
    throw error
  }
}
