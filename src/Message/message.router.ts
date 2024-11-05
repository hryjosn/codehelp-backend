import { validation } from "~/middleware/validation"
import express from "express"
import { newMessageSchema } from "./param-validation"
import { newMessage } from "./message.controller"
import auth from "~/middleware/auth"

const router = express.Router()

router
  .route("/:chatroomId/newMessage")
  .post(validation(newMessageSchema), auth, newMessage)

export default router
