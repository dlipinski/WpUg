/*jshint node: true, esversion: 6, devel: true */

// Aplikacja Express.js
const express = require('express');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// mechanizm sesji (wykorzystamy bazę Redis)
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const sessionStore = new RedisStore({
    host: 'localhost',
    port: 6379,
    client: require('redis').createClient(),
    ttl:  260
});

//db configuration
const dbConfig = require('./db.js');
const mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

// Passport.js
const passport = require('passport');
const expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());
 
// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// konfiguracji aplikacji Express.js
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// konfiguracja obsługi sesji (poziom Express,js)
const sessionSecret = 'Wielki$ekret44';
const sessionKey = 'express.sid';
app.use(session({
    key: sessionKey,
    secret: sessionSecret,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
}));


// obsługa zasobów statycznych
app.use(express.static('public'));

// routing („normalnie” powinien wykorzystywać szablony, np. EJS)
var routes = require('./routes/index')(passport);
app.use('/', routes);

// serwer HTTP dla aplikacji „app”
const server = require('http').createServer(app);


// obsługa Socket.io
const socketIo = require('socket.io');
const sio = socketIo.listen(server);
// konfiguracja passport-socketio
// połączenie od autoryzowanego użytkownika
const onAuthorizeSuccess = (data, accept) => {
    // data – informacje o połączeniu (od Passport.js)
    // accept – funkcja służąca do akceptowania/odrzucania połączenia
    //          odrzucenie: accept(new Error('powód odrzucenia'));
    console.log('Udane połączenie z socket.io');
    accept();
};
// połączenie od nieutoryzowanego użytkownika lub sytuacja błędna
const onAuthorizeFail = (data, message, error, accept) => {
    if (error) { // wystąpił błąd
        throw new Error(message);
    }
    // połączenie nieautoryzowane (ale nie błąd)
    console.log('Nieudane połączenie z socket.io');
    accept(new Error('Brak autoryzacji!'));
};
// passport-socketio jako „middleware” dla Socket.io
const passportSocketIo = require('passport.socketio');
sio.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key:          sessionKey,
    secret:       sessionSecret,
    store:        sessionStore,
    success:      onAuthorizeSuccess,
    fail:         onAuthorizeFail
}));

sio.sockets.on('connection', (socket) => {
    socket.emit('news', {
        ahoj: 'od serwera'
    });
    socket.on('reply', (data) => {
        console.log(data);
    });
});

server.listen(3000, () => {
    console.log('Serwer pod adresem http://localhost:3000/');
});