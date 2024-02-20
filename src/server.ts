import { Server } from "socket.io";
import app from "./app";
import connectDB from "./config/dbConnection";
import dotenv from "dotenv"
import http from 'http'
dotenv.config({ path: '../config.env' })
connectDB()

const httpServer = http.createServer(app)
const port: Number = 3000

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4200"]
  }
})

io.on("connection", (socket) => {
  console.log("New User Connected", socket.id)
})


httpServer.listen(port, () => {
  console.log(`Listening to ${port}`)
})









