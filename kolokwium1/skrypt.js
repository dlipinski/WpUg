//jshint browser: true, esversion: 6, devel: true
const lista = [
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



    function appendScore(){
        let scores = document.querySelector('#wyniki');
        var div = document.createElement("div");
        div.classList.add('wynik');
        div.innerHTML = '0.0';
        scores.appendChild(div);
    }

    function fillList(){
        let ul = document.querySelector('#lista');
        for( let i =0; i< lista.length; i++){
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(lista[i].name));
            li.setAttribute('no',lista[i].no);
            ul.appendChild(li);
            lista[i].inputs =[];
            lista[i].score = 0.0;
        }
    }



    function count(){
        let no = document.querySelector('#zawodnik').getAttribute('no');
        let values = lista[no-1].inputs;
        let sum = [];
        for(let i=0;i<3;i++){
            sum[i]=0;
            for(let j=0;j<5;j++){
                if(values[i*5+j] == parseInt(values[i*5+j], 10)){
                    sum[i]+=parseInt(values[i*5+j]);
                }
                
            }
        }
        let sum2 = (sum[0]+sum[1]+sum[2])/3;

        document.querySelector('.wynik').innerHTML = Math.round(sum2 * 100) / 100;

    }
    function initValues(){
        let inputs = document.querySelectorAll('input');
        document.querySelector('#zawodnik').innerHTML = 'Select user';
        for (let i=0;i<inputs.length;i++){
            
            inputs[i].value = '';
        }
    }

    function fillInputs(){
        let no = document.querySelector('#zawodnik').getAttribute('no');
        let inputs = document.querySelectorAll('input');
        let values = lista[no-1].inputs;

        for (let i=0;i<inputs.length;i++){
            
            if(values[i] == parseInt(values[i], 10)){
                
                inputs[i].value = values[i];
            }
            else{
                inputs[i].value = '';
            }
        }
    }

    function addListeners () {
        let inputs = document.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('focus', function (e) { this.style.background = 'yellow';}, false);
            inputs[i].addEventListener('focusout', function (e) { this.style.background = '#f2f2f2'; }, false);
            inputs[i].addEventListener("keypress", function (evt) { 
                if(this.value.length > 1) {evt.preventDefault();}
                if (evt.which < 48 || evt.which > 57) {evt.preventDefault(); }
                if (evt.which === 13)  {this.blur();}   
                }  ,false);
            inputs[i].addEventListener('input', function (e) { 
                let no = document.querySelector('#zawodnik').getAttribute('no');
                let row = this.parentElement.getAttribute('row');
                let column;
                let temp = this.parentElement.children; for (let j=0;j<temp.length;j++) {if (temp[j]==this) {column = j}}
                let index = ( row * 5 ) + column;
                lista[no-1].inputs[index]=this.value;
                count();
            }, false);
        }   
        let spans = document.querySelectorAll('span');
        for (let i = 0; i < spans.length; i++) {
            spans[i].addEventListener('click', function (e) {
                let siblings = this.parentElement.children;
                for(let i=0;i<siblings.length;i++){
                    if(siblings[i]==this) {
                        this.setAttribute('row',i);
                    }
                }
                
                }, false);
        } 

        let lis = document.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', function (e) {
                this.style.background = 'yellow'; document.querySelector('#zawodnik').innerHTML=this.innerHTML; document.querySelector('#zawodnik').setAttribute('no',this.getAttribute('no'));
                fillInputs();
                count();
                }, false);
        } 
    }
    function numberInputs(){
        
    }

    function initApp(){
        fillList();
        appendScore();
        numberInputs();
        initValues();
        addListeners();
    }

    document.addEventListener('readystatechange', event => {
        if (event.target.readyState === 'interactive') {
        initApp();
        }
    });