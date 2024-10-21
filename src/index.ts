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

export const createServer = async () => {
  await dataSource.initialize()
  const app: Express = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use("/mentor", mentorRouter)
  app.use("/member", memberRouter)
  app.use("/image", imageRouter)

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
  const io = new Server(serverForSocket)
  io.on("connection", (socket) => {
    console.log("connect")

    socket.on("join", (room) => {
      console.log("join")
      socket.join(room)
      socket.to(room).emit("ready", "準備通話")
    })

    // 轉傳 Offer
    socket.on("offer", (room, description) => {
      socket.to(room).emit("offer", description)
    })

    // 轉傳 Answer
    socket.on("answer", (room, description) => {
      socket.to(room).emit("answer", description)
    })

    // 交換 ice candidate
    socket.on("ice_candidate", (room, data) => {
      socket.to(room).emit("ice_candidate", data)
    })

    // 關閉通話
    socket.on("hangup", (room) => {
      console.log("hangup")
      socket.leave(room)
    })

    socket.on("disconnect", () => {
      console.log("user disconnect")
    })
  })

  const port = process.env.PORT
  serverForSocket.listen(Number(port) || 3001, () => {
    console.log(`App running on port ${Number(port) || 3001}.`)
  })
}
export default init()
