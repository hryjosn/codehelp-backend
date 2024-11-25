import express from "express"

import { validation } from "~/middleware/validation"
import { signUp } from "./member.controller"
import { signUpSchema } from "./param-validation"
import { uploadFiles } from "~/middleware/file"

const router = express.Router()

router
  .route("/signUp")
  .post(
    uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
    validation(signUpSchema),
    signUp,
  )

export default router
