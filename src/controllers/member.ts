import { Request, Response } from "express"
import { save, login as memberLogin } from "~/features/member"
import { RESPONSE_CODE } from "~/types"
import FeatureError from "~/utils/FeatureError"

interface IApi {
  (req: Request, res: Response): void
}

export const signUp: IApi = async (req, res) => {
  try {
    const {
      userName,
      password,
      email,
      avatar,
      gender,
      country,
      title,
      company,
      phoneNumber,
      introduction,
      level,
      fieldOfWork,
    } = req.body

    const { newMember, token } = await save({
      userName,
      password,
      email,
      avatar,
      gender,
      country,
      title,
      company,
      phoneNumber,
      introduction,
      level,
      fieldOfWork,
    })

    return res.status(200).send({
      newMember,
      status: "ok",
      message: `${newMember.userName} sign up successful!`,
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

export const login: IApi = async (req, res) => {
  try {
    const { email, password } = req.body
    const { member, token } = await memberLogin({ email, password })

    return res.status(200).send({
      status: "member_login",
      msg: "Login successful",
      token,
      member,
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
