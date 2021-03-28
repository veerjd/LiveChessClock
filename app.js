/* eslint-disable no-console */
const express = require('express');
const app = express();
app.use(express.static('public'))
const httpServer = require('http').createServer(app);
const port = process.env.PORT || 3000
const io = require('socket.io')(httpServer);

const rooms = []

io.on('connection', (socket) => {
  socket.join(socket.handshake.query.room)

  socket.on('message', (data) => {
    socket.to(data.room).emit('message', data)
  })
});

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname })
})

app.post('/joinroom', (req, res) => {
  const newRoom = Math.floor(Math.random() * 1000)
  rooms.push(newRoom)
  res.json({ room: newRoom })
})

app.get('/:room', (req, res) => {
  res.sendFile('public/room.html', { root: __dirname })
})

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`)
});