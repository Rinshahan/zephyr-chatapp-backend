import { Server, Socket } from "socket.io"

import { MessageController } from "./controllers/messageController"
import { RoomController } from "./controllers/roomController";
import { VideoCallController } from "./controllers/videoCallController";
import { InvitationController } from "./controllers/invitationController";


// Function to create unique room name for two users



const sockets = (socket: Socket, io: Server) => {
  console.log("New User Connected", socket.id)
  const messageController = new MessageController(socket, io)
  const roomController = new RoomController(socket, io)
  const invitationController = new InvitationController(socket, io)
  const videoController = new VideoCallController(socket, io)
  socket.on("send-message", messageController.sendMessage)
  socket.on('join-room', roomController.joinRoom)
  socket.on("send-invitation", invitationController.sendInvitation)
  socket.on("accept-invite", invitationController.acceptInvite)
  socket.on("reject-invite", invitationController.rejectInvite)
  socket.on("initiate-call", videoController.initiateCall)
  socket.on("answer-made", videoController.answerCall)
  socket.on("ice-candidate", videoController.iceCandidate)
}

export default sockets