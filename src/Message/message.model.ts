import { Chatroom } from "~/db/entities/Chatroom"
import { Message } from "~/db/entities/Message"

export const addOne = ({
  chatroom,
  userId,
  content,
}: {
  chatroom: Chatroom
  userId: string
  content: string
}) => {
  const newMessage = new Message()
  newMessage.chatroom = chatroom
  newMessage.userId = userId
  newMessage.content = content
  return newMessage.save()
}
