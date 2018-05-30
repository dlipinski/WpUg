//jshint browser: true, esversion: 6

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        initChats();
    }
});

const initChats = () => {
    initHeight();
};

const initHeight = () => {
    $('#chats').height(screen.height * 0.68 );
};

const removeA = (arr) => {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
};