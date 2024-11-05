import { Request, Response } from "express"
import FeatureError from "~/utils/FeatureError"
import { getInfo, getList, save, remove } from "./chatroom.feature"
import { RESPONSE_CODE } from "~/types"

interface IApi {
  (req: Request, res: Response): void
}

export const createChatroom: IApi = async (req, res) => {
  try {
    const { mentorId, userId } = req.body

    const chatroomId = await save({ memberId: userId, mentorId })

    return res.status(200).send({
      chatroomId,
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

export const getChatroom: IApi = async (req, res) => {
  try {
    const { userId } = req.body
    const { chatroomId } = req.params

    const chatroom = await getInfo({ chatroomId: chatroomId, userId })

    return res.status(200).send({
      chatroom,
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

export const getChatroomList: IApi = async (req, res) => {
  try {
    const { userId } = req.body
    const { page, count } = req.query

    const chatroomList = await getList({
      userId,
      page: Number(page),
      count: Number(count),
    })

    return res.status(200).send({
      chatroomList,
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

export const deleteChatroom: IApi = async (req, res) => {
  try {
    const { userId } = req.body
    const { chatroomId } = req.params

    await remove({ chatroomId: chatroomId, userId })

    return res.status(200).send({
      status: "ok",
      message: `Chatroom ${chatroomId} is deleted`,
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
