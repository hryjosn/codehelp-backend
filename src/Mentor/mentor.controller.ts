import {
  save,
  getInfo,
  getList,
  updateMentorAvailableTime,
} from "./mentor.feature"
import { IApi, RESPONSE_CODE } from "~/types"
import FeatureError from "~/utils/FeatureError"

export const signUp: IApi = async (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    const { avatar } = files

    const { newMentor, token } = await save({
      ...req.body,
      avatar,
    })

    return res.status(200).send({
      newMentor,
      status: "ok",
      message: `${newMentor.userName} sign up successful!`,
      token,
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

export const getMentorInfo: IApi = async (req, res) => {
  try {
    const { id } = req.params
    const mentor = await getInfo({ id })

    return res.status(200).send({
      status: "ok",
      mentor,
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

export const getMentorList: IApi = async (req, res) => {
  try {
    const { page, count, keyword } = req.query

    const { mentorList, total } = await getList({
      page: Number(page),
      count: Number(count),
      keyword: keyword?.toString(),
    })

    return res.status(200).send({
      status: "ok",
      mentorList,
      total,
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

export const modifyAvailableTime: IApi = async (req, res) => {
  try {
    const { userId, availableTime } = req.body

    const result = await updateMentorAvailableTime({
      mentorId: userId,
      availableTime,
    })

    res.status(200).send({
      status: "ok",
      id: result.id,
      userName: result.user_name,
      availableTime: result.available_time,
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
