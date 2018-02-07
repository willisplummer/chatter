const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const port = process.env.PORT || 4001
const index = require("./index")
const app = express()
app.use(index)
const server = http.createServer(app)
const io = socketIo(server)

const initialData = []

io.on("connection", socket => {
  console.log("New client connected")
  socket.emit("update chat", initialData)
  socket.join('theChat')

  socket.on("data", (val) => {
    initialData.push(val)
    io.sockets.in('theChat').emit("update chat", initialData)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected")
    socket.leave('theChat')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
