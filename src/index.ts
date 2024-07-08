import "dotenv/config"
import express, { Express, Request, Response } from "express"
import http from "http"
import { Server } from "socket.io"
import { DataSource } from "typeorm"
import userRouter from "./user/user.router"
import cors from "cors"
import bodyParser from "body-parser"
import { ValidationError } from "express-validation"
import { User } from "./entities/User"
import { MemberInfo } from "./entities/memberInfo"
import { MentorInfo } from "./entities/MentorInfo"

export const createServer = async () => {
  const appDataSource = new DataSource({
    type: "postgres",
    name: process.env.DB_USER,
    url: process.env.DB_URL,
    database: process.env.DB,
    password: process.env.DB_PWD,
    port: 5432,
    synchronize: true,
    entities: [User, MemberInfo, MentorInfo],
    extra: {
      max: 1,
    },
  })

  await appDataSource.initialize()
  const app: Express = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  )

  app.use("/", [userRouter])

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

    socket.on("disconnect", () => {
      console.log("user disconnect")
    })
  })
  const port = process.env.PORT
  serverForSocket.listen(Number(port) || 3000, () => {
    console.log(`App running on port ${Number(port) || 3000}.`)
  })
}
export default init()
