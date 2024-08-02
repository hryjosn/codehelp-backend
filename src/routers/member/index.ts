import express from "express"

import { validation } from "~/middleware/validation"
import { login, signUp } from "~/controllers/member"
import { signUpSchema } from "./param-validation"
import { accountSchema } from "../mentor/param-validation"
const router = express.Router()

router.route("/signUp").post(
  // uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
  validation(signUpSchema),
  signUp,
)

router.route("/login").post(validation(accountSchema), login)
export default router
