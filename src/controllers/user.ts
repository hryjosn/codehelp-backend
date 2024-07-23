import bcrypt from "bcrypt"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { addMember, addMentor, findOneBy } from "~/models/user"
import { RESPONSE_CODE } from "~/types"
import { generateToken } from "~/utils/account"

interface IApi {
  (req: Request, res: Response): void
}

export const memberSignUp: IApi = async (req, res) => {
  try {
    const { email, password } = req.body

    const isEmailExist = await findOneBy({ email })
    if (isEmailExist) {
      return res.status(403).send({
        code: RESPONSE_CODE.USER_DATA_ERROR,
        status: "error",
        message: `Email ${email} registered!`,
      })
    }

    const encryptedPassword = await bcrypt.hash(password, 10)
    const newMember = await addMember({
      ...req.body,
      password: encryptedPassword,
    })

    const token = generateToken(newMember)
    delete newMember.password
    return res.status(200).send({
      newMember,
      status: "ok",
      message: `${newMember.user_name} sign up successful!`,
      token,
    })
  } catch (error) {
    res.status(500).send({
      code: RESPONSE_CODE.UNKNOWN_ERROR,
      message: error,
    })

    throw error
  }
}

export const mentorSignUp: IApi = async (req, res) => {
  try {
    const { email, password } = req.body

    const isEmailExist = await findOneBy({ email })
    if (isEmailExist) {
      return res.status(403).send({
        code: RESPONSE_CODE.USER_DATA_ERROR,
        status: "error",
        message: `Email ${email} registered!`,
      })
    }

    const encryptedPassword = await bcrypt.hash(password, 10)
    const newMentor = await addMentor({
      ...req.body,
      password: encryptedPassword,
    })

    const token = generateToken(newMentor)
    delete newMentor.password
    return res.status(200).send({
      newMentor,
      status: "ok",
      message: `${newMentor.user_name} sign up successful!`,
      token,
    })
  } catch (error) {
    res.status(500).send({
      code: RESPONSE_CODE.UNKNOWN_ERROR,
      message: error,
    })

    throw error
  }
}

export const login: IApi = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findOneBy({ email })

    if (!user) {
      return res.status(403).send({
        code: RESPONSE_CODE.USER_DATA_ERROR,
        status: "error",
        message: "User's name or password is not correct",
      })
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(403).send({
        code: RESPONSE_CODE.USER_DATA_ERROR,
        status: "error",
        message: "User Name or password is not correct",
      })
    }
    const token = generateToken(user)
    delete user.password
    return res.status(200).send({
      status: "user_login",
      msg: "Login successful",
      token,
      user,
    })
  } catch (error) {
    res.status(500).send({
      code: RESPONSE_CODE.UNKNOWN_ERROR,
      message: error,
    })
    throw error
  }
}
