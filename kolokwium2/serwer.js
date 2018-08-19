/*jshint node: true, esversion: 6, devel: true */

const list = [
    { no: 1, name: 'Wiga' },
    { no: 2, name: 'Paterna' },
    { no: 3, name: 'Etira' },
    { no: 4, name: 'Emandorissa' },
    { no: 5, name: 'Patria' },
    { no: 6, name: 'Galacja' },
    { no: 7, name: 'Paeksa' },
    { no: 8, name: 'Pilastra' },
    { no: 9, name: 'Elfira' },
    { no: 10, name: 'Fanabella' },
    { no: 11, name: 'Pustynna Noc' },
    { no: 12, name: 'Gratena' },
    { no: 13, name: 'Matahna' },
    { no: 14, name: 'Panetta' },
    { no: 15, name: 'Baklava' },
    { no: 16, name: 'Piera' },
    { no: 17, name: 'Wersa' },
    { no: 18, name: 'Atanda' },
    { no: 19, name: 'Escalada' },
    { no: 20, name: 'Faworyta' },
    { no: 21, name: 'Angelina' },
    { no: 22, name: 'Kalahari' },
    { no: 23, name: 'Godaiva' },
    { no: 24, name: 'Alamina' },
    { no: 25, name: 'Piacolla' },
    { no: 26, name: 'Wieża Bajek' }
];

//dopisane START
const express = require('express');
const app = express();

const socketio = require('socket.io');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));



app.use(bodyParser.json());
app.use(express.static('public'));
const server = require('http').createServer(app);
const io = socketio.listen(server);


//dopisane END

app.get('/list', (req, res) => {
    // zwraca listę zawodników w formacie JSON
    //dopisane START
    res.send(list);
    //dopisane END
});

//dopisanie START
app.get('result/:no', (req, res) => {
    let person = list.find(x => x.no == req.params.no);
    if(person.scores == 'undefined'){
        res.send([0,0,0,0,0]);
    } else {
        res.send(person.scores);
    }
});
//dopisanie END

app.post('/result/:no', (req, res) => {
    // zapisuje wynik zawodnika o numerze „no”
    //dopisane START
    let person = list.find(x => x.no == req.params.no);
    person.scores = [];
    let scores = req.body;
    for (let i=0; i <5 ;i ++){
        person.scores.push(scores['score'+i]);
    }
    console.log(list);
    //dopisane END
});

app.get('/results', (req, res) => {
    // oferuje wyniki na żywo używając Socket.io
    //dopisane START
    //dopisane END
});

server.listen(4000, () => {
    console.log('Serwer działa na porcie 4000');
});