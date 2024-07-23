import express from "express"
import paramValidation, {
  memberSignUpSchema,
  mentorSignUpSchema,
} from "./param-validation"
import { memberSignUp, mentorSignUp, login } from "~/controllers/user"
import { validation } from "~/middleware/validation"
const router = express.Router()

router.route("/signUp/member").post(
  // uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
  validation(memberSignUpSchema),
  memberSignUp,
)
router.route("/signUp/mentor").post(
  // uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
  validation(mentorSignUpSchema),
  mentorSignUp,
)

router.route("/login").post(validation(paramValidation.login), login)
export default router
