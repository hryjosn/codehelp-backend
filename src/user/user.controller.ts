import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import UserModel from "./user.model"
import { RESPONSE_CODE } from "../types"

const { addOne, findOne } = new UserModel()

interface IApi {
  (req: Request, res: Response): void
}

export const signUp: IApi = async (req, res) => {
  try {
    const { userName, email, password } = req.body
    const isUserExist = await findOne({ userName, email })

    if (isUserExist) {
      return res.status(403).send({
        code: RESPONSE_CODE.USER_DATA_ERROR,
        status: "error",
        message: `Please Check your information. userName: ${userName}, or email: ${email} may be registered`,
      })
    }

    const encryptedPassword = await bcrypt.hash(password, 10)
    const newGuest = await addOne({
      ...req.body,
      password: encryptedPassword,
    })
    const token =
      "Bearer " +
      jwt.sign(
        { user_name: newGuest.user_name, _id: newGuest.id },
        String(process.env.TOKEN),
        { expiresIn: "30 day" },
      )
    return res.status(200).send({
      id: newGuest.id,
      status: "ok",
      message: `${newGuest.user_name} sign up successful!`,
      token,
      email: newGuest.email,
    })
  } catch (error) {
    res.status(500).send({
      code: RESPONSE_CODE.UNKNOWN_ERROR,
      message: error,
    })
    throw error
  }
}
