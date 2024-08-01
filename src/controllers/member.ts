import { Request, Response } from "express"
import { save } from "~/features/member"
import { RESPONSE_CODE } from "~/types"

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
    console.log(error)

    res.status(500).send({
      code: RESPONSE_CODE.UNKNOWN_ERROR,
      message: error,
    })

    throw error
  }
}
