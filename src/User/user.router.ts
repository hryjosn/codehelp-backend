import express from "express"

import { validation } from "~/middleware/validation"
import { accountSchema } from "~/utils/common-param-validation"
import { loginController } from "./user.controller"

const router = express.Router()

router.route("/login").post(validation(accountSchema), loginController)

export default router
