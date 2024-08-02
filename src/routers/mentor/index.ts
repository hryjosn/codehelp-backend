import express from "express"

import { validation } from "~/middleware/validation"
import { signUpSchema } from "./param-validation"
import { signUp } from "~/controllers/mentor"

const router = express.Router()

router.route("/signUp").post(
  // uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
  validation(signUpSchema),
  signUp,
)

export default router
