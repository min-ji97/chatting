import logo from './logo.svg';
import './css/Login.css';

import { socket } from './socket';
// import socketIoClient from 'socket.io-client';
import React, { useState, useEffect } from 'react';


// const ENDPOINT = "http://127.0.0.1:5000";


function Login( { setUserName }) {

  const [ inputUserName , setInputUserName ] = useState("");
  // const [ userName , setUserName ] = useState("");
  // const [ message , setMessage ] = useState("");
  // const [socket, setSocket] = useState(null);

  
  // 컴포넌트가 렌더링될 때마다 새로운 소켓 생성 막을라고!
  // useEffect(()=>{
  //   const newSocket = socketIoClient(ENDPOINT);
  //   setSocket(newSocket);

  //   return() => newSocket.disconnect();
  // },[setSocket]);  


  const clickUserName = () =>{

    if(inputUserName.trim()){
      setUserName(inputUserName);


      // setSocket( tempSocket =>{
      //   tempSocket.emit('add user',inputUserName,()=>{
      //     console.log('채팅에 참여 가능합니다!');
      //   });
      //   return tempSocket;
      // });

      socket.emit('add user',inputUserName,()=>{
        console.log('채팅에 참여 가능합니다!');
      });


    }else{
      alert("닉네임을 입력해주세요");
    }

  }

  
  const onChange = (e) =>{
    setInputUserName(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

      <p>사용할 닉네임을 입력해주세요!?</p> 
      <input type="text"
        onKeyDown={(e)=>{
          if(e.key === "Enter") clickUserName();
        }}
        onChange={onChange}
        value={inputUserName}
        />
      <button onClick={clickUserName}>입력</button>
      </header>
    </div>
  );
}

export default Login;
