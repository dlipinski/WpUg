//jshint browser: true, esversion: 6, globalstrict: true, devel: true
/* globals io: false */
'use strict';

// Inicjalizacja UI
document.onreadystatechange = () => {
    if (document.readyState === "interactive") {
        let status = document.getElementById('status');
        let open = document.getElementById('open');
        let close = document.getElementById('close');
        let nick = document.getElementById('nick');
        let send = document.getElementById('send');
        let text = document.getElementById('text');
        let usersTable = document.getElementById('usersTable');
        let message = document.getElementById('message');
        let socket;
        status.textContent = 'Brak połącznia';
        close.disabled = true;
        send.disabled = true;
        text.disabled = true;
        nick.value = "";
        message.value = "";
        nick.focus();
        
        

        // Po kliknięciu guzika „Połącz” tworzymy nowe połączenie WS
        open.addEventListener('click', () => {
            open.disabled = true;
            text.disabled = false;
            nick.disabled = true;

            socket = io.connect(`http://${location.host}`);


            socket.on('echoUsers',(data)=>{
                usersTable.innerHTML = "";
                for(let i=0;i<data.length;i++){
                    let tr = document.createElement('tr');
                    let td = document.createElement('td');
                    td.innerHTML = data[i];
                    if(data[i]===nick.value) {td.innerHTML += "<asd style='color:red;'> ( Me ) </asd> ";}
                    tr.appendChild(td);
                    usersTable.appendChild(tr);
                }
            });

            socket.on('connect', () => {
                socket.emit('nick', {nick: nick.value});
                close.disabled = false;
                send.disabled = false;
                text.disabled = false;
                status.src = 'img/bullet_green.png';
                console.log('Nawiązano połączenie przez Socket.io');

                

            });

            socket.on('echoMessagesFirst', (data) => {
                message.value = "";
                for(let i=0;i<data.length;i++){
                    message.value += data[i].nick + ": "+data[i].text+"\n";
                }
            });
            
            socket.on('disconnect', () => {
                open.disabled = false;
                status.src = 'img/bullet_red.png';
                console.log('Połączenie przez Socket.io zostało zakończone');
                
            });
            socket.on('error', (err) => {
                message.textContent = `Błąd połączenia z serwerem: "${JSON.stringify(err)}"`;
            });
            socket.on('echoMessages', (data) => {
                message.value += data.nick + ": "+data.text+"\n";
                
                message.scrollTop = message.scrollHeight;
            });
            
        });

        // Zamknij połączenie po kliknięciu guzika „Rozłącz”
        close.addEventListener('click', () => {
            if (nick.value === '') {return;}
            close.disabled = true;
            send.disabled = true;
            text.disabled = true;
            nick.disabled = false;
            socket.emit('nickDel', {nick: nick.value});
            usersTable.innerHTML = "";
            message.textContent = '';
            socket.disconnect();
        });

        // Wyślij komunikat do serwera po naciśnięciu guzika „Wyślij”
        send.addEventListener('click', () => {
            if(text.value === '') {return;}
            socket.emit('message', {nick: nick.value, text: text.value});
            message.value +=  "Me" + ": " + text.value + "\n";    
            message.scrollTop = message.scrollHeight;
            console.log(`Sended message: „${nick.value}: ${text.value}”`);
            text.value = '';
        });

        text.addEventListener("keyup", function(event) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
              // Trigger the button element with a click
              send.click();
            }
          });
          nick.addEventListener("keyup", function(event) {
            if(nick.value === '') {return;}

            // Cancel the default action, if needed
            event.preventDefault();
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // Trigger the button element with a click
                open.click();  
                text.focus();
            }
          });
    }
};