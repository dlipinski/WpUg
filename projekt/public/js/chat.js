//jshint browser: true, esversion: 6

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        initChat();
    }
});
const initChat = () => {
    initMessages();
    initHeight();
    initScroll();
};

const initScroll = () => {
    let objDiv = document.getElementById("chatContainer");
    objDiv.scrollTop = objDiv.scrollHeight;
}

const initMessages = () => {
    let messages = document.querySelectorAll('#chatMessage');
    messages.forEach( (message) => {
        message.addEventListener('click', () => {
            let currentDisplay = message.firstElementChild.style.display;
            if(currentDisplay === 'none'){
                message.firstElementChild.style.display = 'block';
            } else {
                message.firstElementChild.style.display = 'none';
            }
        });
    });
};
const initHeight = () => {
    $('#chatContainer').height(screen.height * 0.64 );
};