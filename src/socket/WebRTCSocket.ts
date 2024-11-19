import { Socket } from "socket.io"
import { ClientToServerEvents, ServerToClientEvents } from "../types"

export const WebRTCSocket = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
) => {
  socket.on("join", (room) => {
    socket.join(room)
    socket.to(room).emit("ready")
  })

  socket.on("offer", (room, description) => {
    socket.to(room).emit("offer", description)
  })

  socket.on("answer", (room, description) => {
    socket.to(room).emit("answer", description)
  })

  socket.on("remoteStartShare", (room, isScreenSharing) => {
    socket.to(room).emit("remoteStartShare", isScreenSharing)
  })

  socket.on("remoteStopShare", (room, isScreenSharing) => {
    socket.to(room).emit("remoteStopShare", isScreenSharing)
  })

  socket.on("ice_candidate", (room, data) => {
    socket.to(room).emit("ice_candidate", data)
  })

  socket.on("hangup", (room) => {
    socket.to(room).emit("otherUserHangup")
    socket.leave(room)
  })

  socket.on("disconnect", () => {
    console.log("user disconnect")
  })
}
