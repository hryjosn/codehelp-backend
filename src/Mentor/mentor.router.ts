import express from "express"

import { validation } from "~/middleware/validation"
import { getMentorInfoSchema, signUpSchema } from "./param-validation"
import { getMentorInfo, getMentorList, signUp } from "./mentor.controller"
import { paginationSchema } from "~/utils/common-param-validation"
import { uploadFiles } from "~/middleware/file"

const router = express.Router()

router
  .route("/signUp")
  .post(
    uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
    validation(signUpSchema),
    signUp,
  )

router.route("/info/:id").get(validation(getMentorInfoSchema), getMentorInfo)

router.route("/list").get(validation(paginationSchema), getMentorList)
export default router
