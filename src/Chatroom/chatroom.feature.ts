import { findMemberBy } from "~/Member/member.model"
import {
  add,
  checkIsChatroomExists,
  findMany,
  findOneBy,
} from "./chatroom.model"
import { findMentorBy } from "~/Mentor/mentor.model"
import FeatureError from "~/utils/FeatureError"
import { RESPONSE_CODE } from "~/types"
import { Chatroom } from "~/db/entities/Chatroom"

export const save = async ({
  mentorId,
  memberId,
}: {
  mentorId: string
  memberId: string
}): Promise<string> => {
  try {
    const mentor = await findMentorBy({ id: mentorId })
    const member = await findMemberBy({ id: memberId })

    if (!mentor) {
      throw new FeatureError(
        401,
        RESPONSE_CODE.USER_DATA_ERROR,
        "Mentor not found",
      )
    }
    if (!member) {
      throw new FeatureError(
        401,
        RESPONSE_CODE.USER_DATA_ERROR,
        "Member not found",
      )
    }

    const isChatroomExists = await checkIsChatroomExists({ memberId, mentorId })

    if (isChatroomExists) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.DATA_DUPLICATE,
        `${mentor.userName} and ${member.userName} already have a chatroom`,
      )
    }

    const newChatroom = await add({ mentor, member })

    return newChatroom.id!
  } catch (error) {
    throw error
  }
}

export const getInfo = async ({
  chatroomId,
  userId,
}: {
  chatroomId: string
  userId: string
}): Promise<Chatroom> => {
  try {
    const chatroom = await findOneBy({ chatroomId, userId })

    if (!chatroom) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.TARGET_NOT_EXISTS,
        "Chatroom not found or you're not in this chatroom",
      )
    }

    return chatroom
  } catch (error) {
    throw error
  }
}

export const getList = async ({
  userId,
  page,
  count,
}: {
  userId: string
  page: number
  count: number
}): Promise<Chatroom[]> => {
  try {
    const skip = (page - 1) * count
    const chatroom = await findMany({ userId, skip, count })
    return chatroom
  } catch (error) {
    throw error
  }
}
