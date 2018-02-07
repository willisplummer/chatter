const app = require("express")();
const http = require("http").Server(app)
const io = require("socket.io")(http);
const port = process.env.PORT || 4001

// dont need this for now

// app.get('/', (req, res) => {
//   res.send({ response: "I am alive" }).status(200);
// })

const initialData = []
const room = 'theChat'

io.on("connection", socket => {
  console.log("New client connected")
  socket.emit("update chat", initialData)
  socket.join(room)

  socket.on("data", (val) => {
    initialData.push(val)
    io.sockets.in(room).emit("update chat", initialData)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected")
    socket.leave(room)
  })
})

http.listen(port, () =>
  console.log(`Listening on port ${port}`)
)
