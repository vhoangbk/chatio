import SocketIO from 'socket.io'
import express, { json } from 'express';
import cors from 'cors';
import Desk from './Desk';

const app = express();
app.use(cors())
app.use(express.static(__dirname + "/public"));

let players = new Map();

let desks = Array();

/**
 * API
 */
app.use('/', (req, res, next) => {
  console.log('[REQUEST]', req.url);
  next();
});

// app.post('/api/login', (req, res) => {
//   console.log('[REQUEST]', req.params);
//   console.log(players)
//   res.json({
//     status: 0,
//     message: 'success',
//     data: {},
//   })
// })

app.get('/api/getDesks', (req, res, next) => {
  console.log('desks', JSON.stringify(desks))
  res.json({
    ...desks
  })
});

/**
 * Socket IO
 */
const server = app.listen(process.env.PORT || 8888, () => {
  console.log('Server listening on port 8888');
});

const io = SocketIO(server);

function addClient(id, data){
  if (!players.has(id)) {
    players.set(id, data);
  } else{
    console.log('client has exist');
  }
}

io.sockets.on('connection', function(socket){
  console.log('Client connection', socket.id);

  socket.on("update_info", (data) => {
    addClient(socket.id, data);
    socket.broadcast.emit('user_online',{
      id: socket.id,
      ...players.get(socket.id),
    })
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnect [id=${socket.id}]`);   
    io.emit('user_offline', {
      id: socket.id,
      ...players.get(socket.id),
    });
    players.delete(socket.id);
  });

  socket.on("message", (data) => {
    console.info(`message [id=${socket.id}]`, data);
    socket.broadcast.emit('message',{
      message: data.message,
      ...players.get(socket.id)
    })
  });

  socket.on("create_desk", (data) => {
    console.info(`create_desk [id=${socket.id}]`, data);
    desks.push( new Desk(data.nameDesk, [players.get(socket.id)]))
    socket.broadcast.emit('create_desk',{
      nameDesk: data.nameDesk,
      ...players.get(socket.id)
    })
  });

});