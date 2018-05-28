/*jshint browser: true, globalstrict: true, devel: true, esversion: 6 */
/*global io: false */
'use strict';

// Inicjalizacja UI
document.onreadystatechange = () => {
	if (document.readyState === "interactive") {

		const open	      = document.getElementById('open');
		const close	      = document.getElementById('close');
		const imgstatus = document.getElementById('status');
		const greenBullet = 'img/bullet_green.png';
		const redBullet   = 'img/bullet_red.png';
		const roomName = document.getElementById('room');
		const roomButton = document.getElementById('createRoom');
		const roomsContainer = document.getElementById('rooms');
		const error = document.getElementById('error');
		const textArea = document.getElementById('message');
		const message = document.getElementById('text');
		const messageSend = document.getElementById('send');
		const nickInput = document.getElementById('nick');
		const nickButton = document.getElementById('setNick');
		const roomNamePrint = document.getElementById('roomName');
		let room;
		let rooms = [];
		let connection;
		let roomsMessages = [];
		let roomConnection;
		
		error.style.display = 'none';
		close.disabled = true;
		nickInput.value = '';
		textArea.value = '';
		let fillRooms = (data) => {
			roomsContainer.innerHTML = "";
			data.forEach(element => {
				if (roomsMessages[room] === undefined) {roomsMessages[room]="";}
				let div = document.createElement('div');
				div.className = 'room';
				div.innerHTML = `${element}`;
				div.addEventListener('click', () =>{
					room = element;
					textArea.value = roomsMessages[room];
					roomNamePrint.innerHTML = room;
					//if(roomConnection) {roomConnection.disconnect()};
					roomConnection = io(`http://${location.host}/`+ room);
					roomConnection.on('message', (data) => {
						textArea.value += data + '\n';
						roomsMessages[room]+=(data+"\n");
					});
					console.log("Room connection: ",room);
				});
				roomsContainer.appendChild(div);
			});
		};
		let addRoom = (roomName) => {
			if(rooms.contains(roomName)) {return;}
			let div = document.createElement('div');
			div.className = 'room';
			div.innerHTML = `${roomName}`;
			div.addEventListener('click', () =>{
				textArea.value = roomsMessages[roomName];
				roomNamePrint.innerHTML = roomName;
				roomConnection = io(`http://${location.host}/`+ room);
				roomConnection.on('message', (data) => {
					textArea.value += data + '\n';
					roomsMessages[room]+=(data+"\n");
				});
				console.log("Room connection: ",room);
				
			});
			roomsContainer.appendChild(div);
			
		};
		// Po kliknięciu guzika „Połącz” tworzymy nowe połączenie WS
		open.addEventListener('click', () => {
			open.disabled = true;
			connection = io(`http://${location.host}/room`);
			connection.on('connect', () => {
				imgstatus.src = greenBullet;
				close.disabled = false;
				open.disabled = true;
				console.log('Nawiązano połączenie z serwerem');
			});
			connection.on('disconnect', () => {
				imgstatus.src = redBullet;
				close.disabled = true;
				open.disabled = false;
				console.log('Połączenie z serwerem zostało zakończone');
			});
			connection.on('newRoom', (data) => {
				addRoom(data);
				console.log("Otrzymano nowy pokoj: ",data);
			});
			connection.on('Error', (data) => {
				error.style.display = 'inline-block';
				error.innerHTML = data;
				setTimeout(function() {
					error.style.display = 'none';
				}, 1000); 
				console.log("Blad: ",data);
			});
			
		});
		// Zamknij połączenie po kliknięciu guzika „Rozłącz”
		close.addEventListener('click', () => {
			connection.disconnect();
		});
		nickButton.addEventListener('click', () =>{
			if(nickInput.value === '') {return;}
			connection.emit('newUser',nickInput.value);
		});
		roomButton.addEventListener('click', () =>{
			if(roomName.value === '') {return;}
			roomsMessages[roomName] = "";
			connection.emit('newRoom',roomName.value);

			addRoom(roomName.value);
		});
		messageSend.addEventListener('click', () =>{
			if(message.value === '') {return;}
			roomConnection.emit('message',{nick: nickInput.value, text: message.value});
			textArea.value += nickInput.value + ": " + message.value;
			roomsMessages[roomNamePrint.value] += nickInput.value + ": " + message.value;
			console.log(`Wyslano: '${nickInput.value}: ${message.value}'`);
		});
		// Wyślij komunikat do serwera po naciśnięciu guzika „Wyślij”
		/*
		chatSend.addEventListener('click', () => {
			chat.emit('message', chatText.value);
			console.log(`Wysłałem wiadomość /chat: ${chatText.value}`);
			chatText.value = '';
		});
		newsSend.addEventListener('click', () => {
			news.emit('message', newsText.value);
			console.log(`Wysłałem wiadomość /news: ${newsText.value}`);
			newsText.value = '';
		});*/
	}
};
