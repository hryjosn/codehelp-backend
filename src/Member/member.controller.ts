import { IApi, RESPONSE_CODE } from "~/types"
import FeatureError from "~/utils/FeatureError"
import { save } from "./member.feature"

export const signUp: IApi = async (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    if (files) {
      const { avatar } = files

      const { newMember, token } = await save({ ...req.body, avatar })

      return res.status(200).send({
        newMember,
        status: "ok",
        message: `${newMember.userName} sign up successful!`,
        token,
      })
    } else {
      res.status(400).send({
        code: RESPONSE_CODE.VALIDATE_ERROR,
        message: "Please upload an avatar",
      })
    }
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
