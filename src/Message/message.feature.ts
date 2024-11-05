import { findOneBy as findChatroomBy } from "~/Chatroom/chatroom.model"
import { RESPONSE_CODE } from "~/types"
import FeatureError from "~/utils/FeatureError"
import { addOne } from "./message.model"

export const addMessage = async ({
  chatroomId,
  userId,
  content,
}: {
  chatroomId: string
  userId: string
  content: string
}) => {
  try {
    const chatroom = await findChatroomBy({ chatroomId, userId })
    if (!chatroom) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.TARGET_NOT_EXISTS,
        "Chatroom not found or you're not in this chatroom",
      )
    }

    const newMessage = await addOne({ chatroom, userId, content })
    return newMessage
  } catch (error) {
    throw error
  }
}
