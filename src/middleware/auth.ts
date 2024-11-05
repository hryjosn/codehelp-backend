import { NextFunction, Request, Response } from "express"
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken"
import { RESPONSE_CODE } from "../types"
import { findMemberBy } from "~/Member/member.model"
import { findMentorBy } from "~/Mentor/mentor.model"

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1]
    const decoded = jwt.verify(token!, process.env.TOKEN!) as JwtPayload
    const userId = decoded.id

    if (!userId) {
      return res.status(401).send({
        code: RESPONSE_CODE.USER_DATA_ERROR,
        status: "error",
        message: "Unidentifiable",
      })
    }

    const member = await findMemberBy({ id: userId })
    const mentor = await findMentorBy({ id: userId })

    if (!member && !mentor) {
      return res.status(401).send({
        code: RESPONSE_CODE.USER_DATA_ERROR,
        status: "error",
        message: "User not found",
      })
    }

    req.body.tokenIAT = decoded.iat
    req.body.userId = member?.id || mentor?.id
    next()
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.status(401).send({
        code: RESPONSE_CODE.USER_DATA_ERROR,
        status: error.name,
        message: error.message,
      })
    }
    return res.status(401).send({
      code: RESPONSE_CODE.UNKNOWN_ERROR,
      status: "error",
      message: error,
    })
  }
}

export default auth
