const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const rooms = []

io.on('connection', socket => {
  socket.join(socket.handshake.query.room)

  socket.on('message', data => {
    socket.to(data.room).emit('message', data.message)
  })
});

app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname })
})

app.post('/joinroom', (req, res) => {
  const newRoom = Math.floor(Math.random() * 10000)
  rooms.push(newRoom)
  res.json({ room: newRoom })
})

app.get('/:room', (req, res) => {
  res.sendFile('public/room.html', { root: __dirname })
})

httpServer.listen(3000);