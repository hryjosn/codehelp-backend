import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log(socket);

  console.log("connecting");
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
