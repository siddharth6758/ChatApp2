const socket = io();

let username;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-container');
var uj = new Audio('/userjoin.wav');
var mg = new Audio('/message.mp3');

do{
    username = prompt('Please Enter your name:');
    socket.emit('user_join', username);
    joinMessage(username);
}while(!username);

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

function joinMessage(username){
    let newDiv = document.createElement('div');
    newDiv.classList.add('center','message');
    let markup = `
        <p>${username} joined the chat!</p>
    `;
    newDiv.innerHTML = markup;
    uj.play();
    messageArea.appendChild(newDiv);
}

function leftMessage(username){
    let newDiv = document.createElement('div');
    newDiv.classList.add('center','message');
    let markup = `
        <p>${username} left the chat</p>
    `;
    newDiv.innerHTML = markup;
    messageArea.appendChild(newDiv);
}

function sendMessage(message){
    let msg = {
        user : username,
        message : message.trim()
    }
    mg.play();
    appendMessage(msg,'outgoing');
    textarea.value = '';
    scroll();
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let newDiv = document.createElement('div');
    let classType = type;
    newDiv.classList.add(classType,'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    newDiv.innerHTML = markup;
    messageArea.appendChild(newDiv);
}

socket.on('Recieve_message', (msg)=>{
    appendMessage(msg,'incoming');
    scroll();
})

socket.on('new_user', (username)=>{
    joinMessage(username);
    scroll();
})

socket.on('left', (username)=>{
    leftMessage(username);
    scroll();
})
function scroll(){
    messageArea.scrollTop = messageArea.scrollHeight;
}