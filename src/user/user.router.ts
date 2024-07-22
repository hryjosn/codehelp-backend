// import express from "express"
// import paramValidation, {
//   memberSignUpSchema,
//   mentorSignUpSchema,
// } from "./param-validation"
// import { mentorSignUp, memberSignUp, login } from "./user.controller"
// import { validation } from "../middleware/validation"
// import { uploadFiles } from "../middleware/file"
// const router = express.Router()

// router.route("/signUp/member").post(
//   // uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
//   validation(memberSignUpSchema),
//   mentorSignUp,
// )
// router.route("/signUp/mentor").post(
//   // uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
//   validation(mentorSignUpSchema),
//   memberSignUp,
// )

// router.route("/login").post(validation(paramValidation.login), login)

// export default router
