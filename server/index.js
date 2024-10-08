
const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

// const cors = require('cors');
const router = require('./router');



const app = express();
const server = http.createServer(app);

const io = socketio(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});


app.use(router);

// socket 연결

// 접속한 사람의 수
let userNum = 0;

io.on('connection', async (socket) =>{
    let userStatus = false;  // 유저 있냐

    console.log('-----connection-----');
    
    socket.on("init", (payload)=>{
        console.log('서버의 init', payload);
    });

    socket.on("send message",(item)=>{
        console.log(`${item.author} + : ${item.message}`);
        io.emit("receive message", { author: item.author, message: item.message, time: item.time})
    })

    socket.on('add user',(userName)=>{
        if(userStatus){ 
            console.log('닉네임 더이상 못 만들어요~');
            return ;
        }
        console.log('서버입니다 유저네임이 잘 전달되었나요?',userName);
        socket.userName = userName;
        console.log(socket.userName);
        userNum ++;
        socket.userNum = userNum;
        userStatus = true;
        console.log(`${socket.userName}님의 번호는 ${socket.userNum} /// ${userNum}`);
        socket.userName = userName;
   
        socket.broadcast.emit('login',{ userName });
    
        // socket.emit('username confirmed', { username: socket.username })
    });
    socket.on('send message',({userName , msg})=>{
        socket.userName = userName;
        socket.msg = msg;
        console.log('여기는 서버의 유저네임과 메세지를 확인합니당', userName , msg);
        socket.broadcast.emit('receive message',{ userName, msg  });
    })
    socket.on('join', ({name, room}, callback) => {});

    socket.emit('FromAPI', 'Hello from the server!');

    // socket.on('disconnect', (reason) => {
    //     console.log('유저가 나갔습니다');
    //     console.log('나간이유는!', reason);
    // })
})


server.listen(PORT, ()=>{ 
    console.log(`서버가 ${PORT}에서 시작되었습니다!`); 
});
