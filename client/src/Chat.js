
import React, { useState, useEffect } from 'react';
// import socketIoClient from 'socket.io-client';

import { socket } from './socket';

// const ENDPOINT = "http://127.0.0.1:5000";

// const socket = socketIoClient(ENDPOINT);


const Chat = ({ userName }) =>{

    const [response, setResponse] = useState(""); 
    const [ messageList, setMessageList] = useState([]);
    const [ chatWho , setChatWho] = useState([]);

    // const [socket, setSocket] = useState(null);

    // const socket = socketIoClient(ENDPOINT);
    
    useEffect(()=>{

        // const socket = socketIoClient(ENDPOINT);
        // socket.on("receive message", (message) => {
        //     setChatArr( (chatArr)=>{ chatArr.concat(message)} );
        // });

    },[]);

    // useEffect(()=>{
    //     const newSocket = socketIoClient(ENDPOINT);
    //     setSocket(newSocket);
    
    //     return() => newSocket.disconnect();
    //   },[]);
    
    useEffect(() =>{
       
        socket.on('connect', () => {
            console.log('클라이언트: 소켓 연결 성공!');
        })
        socket.on("FromAPI", data=>{
            console.log('클라이언트의 : FromAPI');
            setResponse(data);
            console.log('클라이언트의 fromAPI라는데 머가뜨는데!',response);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected!");
        });

       

        socket.on('login',(data)=>{
            setChatWho(chatWho.concat(data.userName));
        });
        // socket.on('connect_error', (error) => {
        //     console.log('Connection Error:', error);
        // });
        
        // socket.on('reconnect_attempt', () => {
        //     console.log('Trying to reconnect...');
        // });

        // return () => {
        //     socket.disconnect();  // 컴포넌트 언마운트 시 소켓 연결 해제
        // };   

        // socket.on()

        return () =>{
            socket.off('login');
        }

    },[socket]);

    const sendMessageHandler = (e) =>{
        console.log(e);
        socket.emit("send message",{
            // author: userName,
        })
    }
    const onChange = (e)=>{
        setMessageList(e.target.value);
    }
    return(
        <div>
            <div className='chat--container'>
                <div className='chat--box'>
                    
                    <span>{`${chatWho}님이 입장하셨습니다.`}</span>
                </div>
                <input className='chat--input' type="text" 
                placeholder='메시지를 입력해주세요'

                onKeyDown={(e)=>{
                    if( e.key === "Enter") sendMessageHandler();
                }} 
                onChange={onChange}
                value={messageList}
                />
                <button onClick={sendMessageHandler}>전송</button>

            </div>
          
        </div>
    )
}


export default Chat;