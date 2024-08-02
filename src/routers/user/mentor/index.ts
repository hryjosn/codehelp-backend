import express from "express"

import { validation } from "~/middleware/validation"
import { signUpSchema } from "./param-validation"
import { login, signUp } from "~/controllers/mentor"
import { accountSchema } from "../common-param-validation"

const router = express.Router()

router.route("/signUp").post(
  // uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
  validation(signUpSchema),
  signUp,
)

router.route("/login").post(validation(accountSchema), login)
export default router
