//jshint node: true, esversion: 6
const connect = require('connect');
const app = connect();
const serveStatic = require('serve-static');

const httpServer = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio.listen(httpServer);

app.use(serveStatic('public'));

// io.set('heartbeat timeout', 10);
// io.set('heartbeat interval', 10);
let rooms = [];
let users = [];


const room = io
    .of('/room')
    .on('connect', (socket) => {
        console.log('-----------------------------');
    	console.log('Wysylka listy serwerow: ',rooms);
        socket.emit('roomsList', rooms);
        
        socket.on('newUser', (data) => {
            console.log(data);
            if (users.includes(data)){
                console.log(`User: ${data} exists arleady.`);
                socket.emit('Error', `User ${data} arleady exists.`);
            }else{
                console.log(`Added new user: ${data}`);
                users.push(data);
                socket.emit('userList', users);
                socket.broadcast.emit('userList', users);
            }
        });
        socket.on('newRoom', (data) => {
            let found = rooms.some(function (el) {
                return el.name === data;
            });
            if (found){
                console.log(`Room: ${data} exists arleady.`);
                socket.emit('Error', `Room ${data} arleady exists.`);
            }else{
                
                let newRoom = {name: data, messages: []};

                newRoom.connection = io
                .of(`/${newRoom.name}`)
                .on('connect', (socketI) => {
                    console.log(`Uruchomiłem kanał „/${newRoom.name}”`);
                    socketI.on('message', (message) => {
                        console.log(`/${newRoom.name}, ${message.nick}, ${message.text}`);
                        socketI.broadcast.emit('message', `${message.nick}:  ${message.text}`);

                    });
                });

                rooms.push(newRoom);
                console.log(`Added new room: ${data}`);
                socket.broadcast.emit('newRoow', data.name);
            }
        });
    });

/*
const chat = io
    .of('/chat')
    .on('connect', (socket) => {
    	console.log('Uruchomiłem kanał „/chat”');
        socket.on('message', (data) => {
            console.log(`/chat: ${data}`);
            socket.emit('message', `/chat: ${data}`);
        });
    });

const news = io
    .of('/news')
    .on('connect', (socket) => {
        console.log('Uruchomiłem kanał „/news”');
        socket.on('message', (data) => {
            console.log(`/news: ${data}`);
        	socket.emit('message', `/news: ${data}`);
        });
    });
*/
httpServer.listen(3000, () => {
    console.log('Serwer HTTP działa na pocie 3000');
});
