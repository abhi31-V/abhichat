const io = require('socket.io')(8000)

const users = {}
io.on('connection', socket => {
  socket.on('new-user', name => {
    console.log(name )
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send', message => {
    
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
