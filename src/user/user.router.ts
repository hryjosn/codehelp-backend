import express from "express"
import paramValidation from "./param-validation"
import { signUp, login } from "./user.controller"
import { validation } from "../middleware/validation"
const router = express.Router()

router.route("/signUp").post(validation(paramValidation.signUp), signUp)

router.route("/login").post(validation(paramValidation.login), login)

export default router
