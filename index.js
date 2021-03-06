const http = require("http").Server()
const io = require("socket.io")(http)
const port = process.env.PORT || 4001
const { query } = require('./db/index')
const { getMessages, writeMessage } = require('./db/queries')

let initialData = []

io.on("connection", socket => {
  console.log("New client connected")
  const room = socket.handshake.query.room
  getMessages(room)
    .then(rows => {
      initialData = rows
      socket.emit("update chat", initialData)
      socket.join(room)
      io.sockets.in(room).emit("update userCount", Object.keys(io.sockets.in(room).connected).length)
    })

  socket.on("data", ({ body, nickname, avatarUrl}) => {
    writeMessage(room, nickname, avatarUrl, body)
      .then(res => {
        initialData.push(res.rows[0])
        io.sockets.in(room).emit("update chat", initialData)
      })
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected")
    socket.leave(room)
    io.sockets.in(room).emit("update userCount", Object.keys(io.sockets.in(room).connected).length)
  })
})

http.listen(port, () =>
  console.log(`Listening on port ${port}`)
)
