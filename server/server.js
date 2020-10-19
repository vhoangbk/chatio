import SocketIO from 'socket.io'
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.static(__dirname + "/public"));

let clients = new Map();

/**
 * API
 */
app.use('/', (req, res, next) => {
  console.log('[REQUEST]', req.url);
  next();
});

app.post('/api/login', (req, res) => {
  console.log('[REQUEST]', req.params);
  console.log(clients)
  res.json({
    status: 0,
    message: 'success',
    data: {},
  })
})

/**
 * Socket IO
 */
const server = app.listen(process.env.PORT || 8888, () => {
  console.log('Server listening on port 8888');
});

const io = SocketIO(server);

function addClient(id, data){
  if (!clients.has(id)) {
    clients.set(id, data);
  } else{
    console.log('client has exist');
  }
}

io.sockets.on('connection', function(socket){
  console.log('Client connection', socket.id);

  socket.on("update_info", (data) => {
    addClient(socket.id, data);
  });

  socket.broadcast.emit('user_online', {
    id: socket.id,
    ...clients[socket.id],
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnect [id=${socket.id}]`);   
    socket.broadcast.emit('user_offline', {
      id: socket.id,
      ...clients[socket.id],
    });
    clients.delete(socket.id);
  });

  socket.on("sendMsg", (data) => {
    console.info(`sendMsg [id=${socket.id}]`, data);
  });

});