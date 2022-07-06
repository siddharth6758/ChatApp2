const express = require('express');
const app = express();
const http = require('http').createServer(app);
const user = {};

const port = process.env.PORT || 3000;
http.listen(port , ()=>{
    console.log(`listening on port http://localhost:${port}`);
});

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
})

//Socket

const io = require('socket.io')(http)

io.on('connection', (socket)=>{
    socket.on('user_join',(username)=>{
        user[socket.id] = username;
        socket.broadcast.emit('new_user',username);
    })
    socket.on('message',(msg)=>{
        socket.broadcast.emit('Recieve_message', msg);
    })
})
