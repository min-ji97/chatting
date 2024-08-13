import logo from './logo.svg';
import './css/Login.css';

import { socket } from './socket';
import React, { useState, useEffect } from 'react';




function Login( { setUserName }) {

  const [ inputUserName , setInputUserName ] = useState("");

  const clickUserName = () =>{

    if(inputUserName.trim()){

      setUserName(inputUserName);
      socket.emit('add user',inputUserName);

    }else{
      console.info("닉네임을 입력해주세요");
    }
  }

  
  const onChange = (e) =>{
    setInputUserName(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />

      <p>사용할 닉네임을 입력해주세요!</p> 
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
