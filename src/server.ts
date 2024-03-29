import { Server, Socket } from "socket.io";
import app from "./app";
import connectDB from "./config/dbConnection";
import dotenv from "dotenv"
import http from 'http'
import sockets from "./apis/socket/routes";

dotenv.config({ path: '../config.env' })
connectDB()

const httpServer = http.createServer(app)
const port: Number = 4000

const io = new Server(httpServer, {
  cors: {
    origin: ["https://zephyr-chatapp.vercel.app/"]
  }
})


io.on("connection", (socket) => {
  sockets(socket, io)
})


httpServer.listen(port, () => {
  console.log(`Listening to ${port}`)
})
