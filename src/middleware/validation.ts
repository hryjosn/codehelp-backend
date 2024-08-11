import { NextFunction, Request, Response } from "express"
import { ObjectSchema } from "joi"
import { RESPONSE_CODE } from "../types"

export const validation = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate({
      body: { ...req.body, ...req.files, ...req.params },
    })

    const valid = error == null

    if (valid) {
      req.body = value.body
      next()
    } else {
      const { details } = error
      const message = details.map((i) => i.message).join(",")
      console.log("message>", message)
      res.status(422).send({
        code: RESPONSE_CODE.VALIDATE_ERROR,
        error: message,
      })
    }
  }
}
