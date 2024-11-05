import { Request, Response } from "express"
import FeatureError from "~/utils/FeatureError"
import { RESPONSE_CODE } from "~/types"
import { addMessage } from "./message.feature"

interface IApi {
  (req: Request, res: Response): void
}

export const newMessage: IApi = async (req, res) => {
  try {
    const { chatroomId } = req.params
    const { userId, content } = req.body

    const messageDetail = await addMessage({ chatroomId, userId, content })

    return res.status(200).send({
      message: messageDetail,
      status: "ok",
    })
  } catch (error) {
    if (error instanceof FeatureError) {
      res.status(error.serverStatus).send({
        code: error.code,
        message: error.message,
      })
    } else {
      res.status(500).send({
        code: RESPONSE_CODE.UNKNOWN_ERROR,
        message: error,
      })
      throw error
    }
  }
}
