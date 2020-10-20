import React, {useRef, useState} from 'react';
import './App.css';
import io from 'socket.io-client';
import fetch from 'node-fetch';

function App() {

  const HOST = 'http://localhost';
  const PORT = process.env.PORT || 8888;

  let socket = useRef(null)

  const [msg, setMsg] = useState('');
  const [name, setName] = useState('');
  const [desk, setDesk] = useState('');
  const [logs, setLogs] = useState([]);
  const [isConnected, setConnected] = useState(false);

  const onConnect = () => {
    socket.current = io(`${HOST}:${PORT}`);
    socket.current.on('connect', function(){
      setConnected(true);
      addLog('You are connect')
      socket.current.emit('update_info', {name: name})

      socket.current.on('disconnect', function(){
        setConnected(false);
        addLog('You are disconnect')
      });

      socket.current.on('user_offline', function(data){
        addLog(`${data.name} is offline`)
      });

      socket.current.on('user_online', function(data){
        addLog(`${data.name} is online`)
      });

      socket.current.on('message', function(data){
        addLog(`${data.name} send: ${data.message}`)
      });

      socket.current.on('create_desk', function(data){
        addLog(`${data.name} create desk: ${data.nameDesk}`)
      });

    });
  }

  const onSentMsg = () => {
    if(socket.current){
      socket.current.emit('message', {message: msg})
      setMsg('')
    } else {
      console.log('cant not send message');
    }
  }

  const onDisconnect = () => {
    if (socket) {
      setMsg('')
      socket.current.disconnect();
    }
  }

  const addLog = (msg) => {
    logs.push(msg);
    setLogs([...logs]);
  }

  const onCreateDesk = () => {
    if(socket.current){
      socket.current.emit('create_desk', {nameDesk: desk})
      setDesk('')
    } 
  }

  const renderLogItem = (msg, i) => {
    return(
      <div style={{paddingLeft: 5}} key={i}>
        <p>{msg}</p>
      </div>
    )
  }

  const onPressGetListDesk = () => {
    fetch('http://localhost:8888/api/getDesks')
    .then(res => res.json())
    .then(json => console.log(json));
  }

  return (
    <div>
      <div>
        <input type="text" onChange={txt => setName(txt.target.value)} />
        <button disabled={isConnected ? true : false} onClick={onConnect}>Connect</button>
        <p>{isConnected ? 'Connected' : 'Disconnected'}</p>
      </div>
      <div>
        <input type="text" value={msg} onChange={txt => setMsg(txt.target.value)} />
        <button onClick={onSentMsg}>Send</button>
      </div>

      <div>
        <button disabled={isConnected ? false : true} onClick={onDisconnect}>Disconnect</button>
      </div>

      <div>
        <input type="text" value={desk} onChange={txt => setDesk(txt.target.value)} />
        <button onClick={onCreateDesk}>Create desk</button>
      </div>

      <div>
        <button onClick={onPressGetListDesk}>Get List desk</button>
      </div>

      <div className="app-log">
        { logs.map((msg, i) => renderLogItem(msg, i) ) }
      </div>
      
    </div>
  );

  
}

export default App;
