import express from "express"

import { validation } from "~/middleware/validation"
import {
  getMentorInfoSchema,
  searchSchema,
  signUpSchema,
  updateAvailableTimeSchema,
} from "./param-validation"
import {
  getMentorInfo,
  getMentorList,
  modifyAvailableTime,
  signUp,
} from "./mentor.controller"
import { uploadFiles } from "~/middleware/file"
import auth from "~/middleware/auth"

const router = express.Router()

router
  .route("/signUp")
  .post(
    uploadFiles.fields([{ name: "avatar", maxCount: 1 }]),
    validation(signUpSchema),
    signUp,
  )

router.route("/info/:id").get(validation(getMentorInfoSchema), getMentorInfo)

router.route("/list").get(validation(searchSchema), getMentorList)

router
  .route("/updateAvailableTime")
  .put(validation(updateAvailableTimeSchema), auth, modifyAvailableTime)

export default router
