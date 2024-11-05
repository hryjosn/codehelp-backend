import "dotenv/config"
import express, { Express, Request, Response } from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import bodyParser from "body-parser"
import { ValidationError } from "express-validation"
import dataSource from "./db/dataSource"
import mentorRouter from "~/Mentor/mentor.router"
import memberRouter from "~/Member/member.router"
import imageRouter from "~/Image/image.router"
import chatroomRouter from "~/Chatroom/chatroom.router"
import messageRouter from "./Message/message.router"
import { WebRTCSocket } from "./socket/WebRTCSocket"

export const createServer = async () => {
  await dataSource.initialize()
  const app: Express = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use("/mentor", mentorRouter)
  app.use("/member", memberRouter)
  app.use("/image", imageRouter)
  app.use("/chatroom", [chatroomRouter, messageRouter])

  app.use((req: Request) => {
    console.log("index", req.body)
  })
  app.use((err: ValidationError, req: Request, res: Response) => {
    if (err) {
      return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(err)
  })
  return app
}

const init = async () => {
  const server = await createServer()
  const serverForSocket = http.createServer(server)
  const io = new Server(serverForSocket, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET"],
    },
  })
  io.on("connection", (socket) => {
    console.log("connect")
    WebRTCSocket(socket, io)
  })
  const port = process.env.PORT
  serverForSocket.listen(Number(port) || 3001, () => {
    console.log(`App running on port ${Number(port) || 3001}.`)
  })
}
export default init()
