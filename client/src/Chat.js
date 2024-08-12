
import React, { useState, useEffect } from 'react';
import socketIoClient from 'socket.io-client';

const ENDPOINT = "http://127.0.0.1:5000";

const Chat = () =>{

    const [response, setResponse] = useState(""); 

    const [ chatArr, setChatArr] = useState([]);
    const socket = socketIoClient(ENDPOINT);
    
    useEffect(()=>{
        const socket = socketIoClient(ENDPOINT);
        socket.on("receive message", (message) => {
            setChatArr( (chatArr)=>{ chatArr.concat(message)} );
        });
    },[]);

    useEffect(() =>{
       
        socket.on("FromAPI", data=>{
            console.log('클라이언트의 : FromAPI');
            setResponse(data);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected!");
        });

        // return () => {
        //     socket.disconnect();  // 컴포넌트 언마운트 시 소켓 연결 해제
        // };   

        // socket.on()

        socket.on('login',(data)=>{
            console.log('클라이언트의 로그인입니다! 데이터 잘 받아왔나유!', data);
        });

    },[]);

    const sendMessageHandler = (e) =>{
        socket.emit("send message",{
            // author: userName,
        })
    }

    return(
        <div>
            <div className='chat--container'>
                <div className='chat--box'>

                </div>
                <input className='chat--input' type="text" 
                placeholder='메시지를 입력해주세요'
                // value={dd}
                // onChange={ff}
                onKeyDown={(e)=>{
                    e.key === "Enter" && sendMessageHandler();
                }} />
                <button onClick={sendMessageHandler}>전송</button>

            </div>
          
        </div>
    )
}


export default Chat;