import { Request, Response } from "express"
import { save, login as mentorLogin } from "~/features/mentor"
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
      linkedInURL,
      primaryExpertise,
      secondaryExpertise,
      tertiaryExpertise,
      disciplines,
      skills,
      tools,
    } = req.body

    const { newMentor, token } = await save({
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
      linkedInURL,
      primaryExpertise,
      secondaryExpertise,
      tertiaryExpertise,
      disciplines,
      skills,
      tools,
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

export const login: IApi = async (req, res) => {
  try {
    const { email, password } = req.body
    const { mentor, token } = await mentorLogin({ email, password })

    return res.status(200).send({
      status: "mentor_login",
      msg: "Login successful",
      token,
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
