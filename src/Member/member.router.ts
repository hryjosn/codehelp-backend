import express from "express"

import { validation } from "~/middleware/validation"
import { login, signUp } from "./member.controller"
import { signUpSchema } from "./param-validation"
import { accountSchema } from "~/utils/common-param-validation"

const router = express.Router()

router.route("/signUp").post(
  // uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
  validation(signUpSchema),
  signUp,
)

router.route("/login").post(validation(accountSchema), login)
export default router
