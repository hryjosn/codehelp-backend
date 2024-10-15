import express from "express"
import { validation } from "~/middleware/validation"
import { createChatroomSchema, getChatroomInfoSchema } from "./param-validation"
import {
  createChatroom,
  getChatroom,
  getChatroomList,
} from "./chatroom.controller"
import auth from "~/middleware/auth"
import { paginationSchema } from "~/utils/common-param-validation"

const router = express.Router()

router
  .route("/create")
  .post(validation(createChatroomSchema), auth, createChatroom)

router
  .route("/info/:chatroomId")
  .get(validation(getChatroomInfoSchema), auth, getChatroom)

router.route("/list").get(validation(paginationSchema), auth, getChatroomList)

export default router