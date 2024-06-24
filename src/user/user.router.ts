import express from "express"
import paramValidation from "./param-validation"
import { signUp } from "./user.controller"
import { validation } from "../middleware/validation"
const router = express.Router()

router.route("/signUp").post(validation(paramValidation.signUp), signUp)

export default router
