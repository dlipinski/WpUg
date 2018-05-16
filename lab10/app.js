//jshint node: true, esversion: 6
const connect = require('connect');
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio.listen(httpServer);

app.use(serveStatic('public'));

let currentUsers = [];
let messages =[];


function getLastMessages(){
    return messages.slice(Math.max(messages.length - 3, 1));
}

function deleteUser(nick){
    var index = currentUsers.indexOf(nick);
    if (index >= 0) {
        currentUsers.splice( index, 1 );
    }
}

io.sockets.on('connect', (socket) => {
    console.log('Socket.io: połączono.');

    socket.emit('echoMessagesFirst', getLastMessages());

    socket.on('nick', (data) => {
        currentUsers.push(data.nick);
        socket.emit('echoUsers', currentUsers);
        socket.broadcast.emit('echoUsers', currentUsers);
    });
    socket.on('message', (data) => {
        messages.push({nick: data.nick, text: data.text});
        socket.broadcast.emit('echoMessages', {nick: data.nick, text: data.text});
    });
    socket.on('disconnect', () => {
        console.log('Socket.io: rozłączono.');
    });

    socket.on('nickDel', (data) => {
        deleteUser(data.nick);
        socket.broadcast.emit('echoUsers', currentUsers);
    });
    socket.on('error', (err) => {
        console.dir(err);
    });
});

httpServer.listen(3000, () => {
    console.log('Serwer HTTP działa na pocie 3000');
});
