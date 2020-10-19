import React, {useRef, useState} from 'react';
import './App.css';
import io from 'socket.io-client';

function App() {

  const HOST = 'http://localhost';
  const PORT = 8888;

  let socket = useRef(null)

  const [msg, setMsg] = useState('');
  const [isConnected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState('');

  const onConnect = () => {
    socket.current = io(`${HOST}:${PORT}`);
    socket.current.on('connect', function(){
      setConnected(true);

      socket.current.on('disconnect', function(){
        console.log('disconnect');
        setConnected(false);
      });

      socket.current.on('user_offline', function(data){
        console.log('user_offline', data);
      });

      socket.current.on('user_online', function(data){
        console.log('user_online', data);
      });

    });
  }

  const onSentMsg = () => {
    console.log('onSentMsg', msg);
    if(socket.current){
      socket.current.emit('sendMsg', {to: '001', 'message': msg})
    } else {
      console.log('cant not send message');
    }
  }

  const onDisconnect = () => {
    if (socket) {
      socket.current.disconnect();
    }
  }

  return (
    <div>
      <div>
        <button disabled={isConnected ? true : false} onClick={onConnect}>Connect</button>
        <p>{isConnected ? 'Connected' : 'Disconnected'}</p>
      </div>
      <div>
        <input type="text" onChange={txt => setMsg(txt.target.value)} />
        <button onClick={onSentMsg}>Send</button>
      </div>

      <div>
        <button disabled={isConnected ? false : true} onClick={onDisconnect}>Disconnect</button>
      </div>
      
    </div>
  );
}

export default App;
