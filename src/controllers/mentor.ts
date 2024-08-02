import { Request, Response } from "express"
import { save } from "~/features/mentor"
import { RESPONSE_CODE } from "~/types"
import HttpError from "~/utils/HttpError"

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
    if (error instanceof HttpError) {
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
