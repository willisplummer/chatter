const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const port = process.env.PORT || 4001
const index = require("./index")
const app = express()
app.use(index)
const server = http.createServer(app)
const io = socketIo(server)

const initialData = ['hi', 'hi', 'cool', 'sup', 'nm', 'you']

io.on("connection", socket => {
  console.log("New client connected")
  setTimeout(() => {
    console.log('sending initialData')
    socket.emit("init", initialData)
  }, 100)

  socket.on("data", (val, fn) => {
    console.log(val)
    initialData.push(val)
    fn(initialData)
  })

  socket.on("disconnect", () => console.log("Client disconnected"))
})

server.listen(port, () => console.log(`Listening on port ${port}`))
