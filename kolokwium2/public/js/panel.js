//jshint browser: true, esversion: 6, devel:true

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
        initApp();
    }
});

const initApp = () => {
    fillList();
    addButtonListener();
};




const fillList = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/list", true);
    xhr.addEventListener('load', function() {
        if (this.status === 200) {
            let ul = document.getElementById('list');
            let contestants = JSON.parse(this.response);
            contestants.forEach( (elem) => {
                let li = document.createElement('li');
                li.innerHTML = elem.name;
                li.addEventListener('click', ()=> {
                    let name = document.getElementById('name');
                    name.innerHTML = elem.name;
                    name.setAttribute('contestant',elem.no);
                    console.log(elem);
                    if(elem.scores){
                        let inputs = document.querySelectorAll('input');
                        inputs.forEach( (input,index) => {
                            input.value = elem.scores[index];
                        });
                    }
                });
                ul.appendChild(li);
            });
        }   
    });
    xhr.send();
};

const addButtonListener = () => {
    document.getElementById('sendbtn').addEventListener( 'click', () => {
        let url = "/result/" +  document.getElementById('name').getAttribute('contestant');
        let params = "";
        let inputs = document.querySelectorAll('input');
        inputs.forEach( (input,index) => {
            params += "score"+index+"="+input.value+"&";
        });
        params = params.substring(0, params.length - 1);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState > 3 && xhr.status === 200) {
                xhr(xhr.responseText);
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    });
};