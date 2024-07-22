// import bcrypt from "bcrypt"
// import { Request, Response } from "express"
// import jwt from "jsonwebtoken"
// import UserModel from "./user.model"
// import { RESPONSE_CODE } from "../types"
// import { generateToken } from "../utils/account"

// const { addOne, findOne } = new UserModel()

// interface IApi {
//   (req: Request, res: Response): void
// }

// export const mentorSignUp: IApi = async (req, res) => {
//   try {
//     const { password, email } = req.body

//     const isEmailExist = await findOne({ email })

//     if (isEmailExist) {
//       return res.status(403).send({
//         code: RESPONSE_CODE.USER_DATA_ERROR,
//         status: "error",
//         message: `Email ${email} registered!`,
//       })
//     }

//     const encryptedPassword = await bcrypt.hash(password, 10)
//     const newMentor = await addOne({
//       ...req.body,
//       password: encryptedPassword,
//     })

//     const token = generateToken(newMentor)

//     return res.status(200).send({
//       newMentor,
//       status: "ok",
//       message: `${newMentor.user_name} sign up successful!`,
//       token,
//     })
//   } catch (error) {
//     res.status(500).send({
//       code: RESPONSE_CODE.UNKNOWN_ERROR,
//       message: error,
//     })

//     throw error
//   }
// }

// export const memberSignUp: IApi = async (req, res) => {
//   try {
//     const { password, email } = req.body

//     const isEmailExist = await findOne({ email })

//     if (isEmailExist) {
//       return res.status(403).send({
//         code: RESPONSE_CODE.USER_DATA_ERROR,
//         status: "error",
//         message: `Email ${email} registered!`,
//       })
//     }

//     const encryptedPassword = await bcrypt.hash(password, 10)
//     const newMember = await addOne({
//       ...req.body,
//       password: encryptedPassword,
//     })
//     const token = generateToken(newMember)

//     return res.status(200).send({
//       newMember,
//       status: "ok",
//       message: `${newMember.user_name} sign up successful!`,
//       token,
//     })
//   } catch (error) {
//     res.status(500).send({
//       code: RESPONSE_CODE.UNKNOWN_ERROR,
//       message: error,
//     })
//     throw error
//   }
// }

// export const login: IApi = async (req, res) => {
//   try {
//     const { userName, password } = req.body
//     const user = await findOne({ userName })

//     if (!user) {
//       return res.status(403).send({
//         code: RESPONSE_CODE.USER_DATA_ERROR,
//         status: "error",
//         message: "User's name or password is not correct",
//       })
//     }
//     const isPasswordCorrect = await bcrypt.compare(password, user.password!)

//     if (!isPasswordCorrect) {
//       return res.status(403).send({
//         code: RESPONSE_CODE.USER_DATA_ERROR,
//         status: "error",
//         message: "User Name or password is not correct",
//       })
//     }
//     const token =
//       "Bearer " +
//       jwt.sign(
//         { user_name: userName, _id: user.id },
//         String(process.env.TOKEN),
//         { expiresIn: "30 day" },
//       )

//     return res.status(200).send({
//       status: "user_login",
//       msg: "Login successful",
//       token,
//       id: user.id,
//       email: user.email,
//       phoneNumber: user.phone_number,
//     })
//   } catch (error) {
//     res.status(500).send({
//       code: RESPONSE_CODE.UNKNOWN_ERROR,
//       message: error,
//     })
//     throw error
//   }
// }
