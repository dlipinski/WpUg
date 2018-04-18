/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';


var  kod= [ 1,2,3,4];

var ruch = [ 1,5,5,2];


const ocena = (kod) => {
    return (ruch) => {

        let czarne = [];
        let biale = [];

        // Check if kod and ruch are equal length
        if (kod.length !== ruch.length){
            throw ({ typerr: "Tables are not equal length!" });
        }

        // Find blacks and remember position
        kod.forEach( (value, index) => {
            if(value===ruch[index]){
                czarne.push(index);
                console.log("Black found: " + value);
            }
        });

        kod.forEach( (value, index) => {
                let is_white_arleady=false;
                let is_black=false;
                let is_white = false;

                biale.forEach( (bvalue) => {if(bvalue===index) { is_white_arleady=true; } });
                czarne.forEach( (czvalue) => {if(czvalue===index) { is_black=true; } });
                
                ruch.forEach( (rvalue) => {if(rvalue==value){is_white=true}});
                if(!(is_white_arleady || is_black) && is_white){
                    biale.push(index);
                }
        });
    
       
        
       return { biale, czarne};
    };
};

var myOcena;

try{
    myOcena = ocena (kod)(ruch);
    console.log(myOcena.biale);
    console.log(myOcena.czarne);
} catch (e) {
    console.log(e.typerr);
}



