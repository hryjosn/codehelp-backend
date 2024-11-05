import { Server, Socket } from "socket.io"
import { ClientToServerEvents, ServerToClientEvents } from "../types"

export const WebRTCSocket = (
  socket: Socket<ClientToServerEvents, ServerToClientEvents>,
  io: Server,
) => {
  socket.on("join", (room) => {
    socket.join(room)
    const members = Array.from(io.of("/").adapter.rooms.get(room) || [])
    // 向所有裝置告知有新裝置加入（包含自己）
    socket.in(room).emit("ready", socket.id, members)
  })

  socket.on("offer", (desc, remoteId, localId) => {
    socket.to(localId).emit("offer", desc, remoteId)
  })

  socket.on("answer", (desc, remoteId, localId) => {
    socket.to(localId).emit("answer", desc, remoteId)
  })

  socket.on("ice_candidate", (data, remoteId, localId) => {
    socket.to(localId).emit("ice_candidate", data, remoteId)
  })

  socket.on("hangup", (room) => {
    socket.to(room).emit("leave")
    socket.leave(room)
  })

  socket.on("disconnect", () => {
    console.log("user disconnect")
  })
}
