/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';


var  kod= [ 1,2,3,4];

var ruch = [ 1,4,3,1];

const ocena = (kod) => {
    return (ruch) => {

        // Check if kod and ruch are equal length
        if (kod.length !== ruch.length){
            throw ({ typerr: "Arrays are not equal length!" });
        }

        //Init arrays for black and white indexes
        let black =[];
        let white = [];

        // Find blacks and remember position
        kod.forEach( (value, index) => {
            if(value===ruch[index]){
                black.push(index);
                console.log("Black found: " + value);
            }
        });

        // Find whites and remember position
        kod.forEach( (value, index) => {
            if(ruch.includes(value) && !black.includes(index) && !white.includes(index)){
                white.push(index);
                console.log("White found: " + value);
            }
        });

        return {biale: white.length, czarne: black.length};
    };
};


try{
    let myOcena = ocena (kod)(ruch);
    console.log('Białe: '+myOcena.biale);
    console.log('Czarne: '+myOcena.czarne);
} catch (e) {
    console.log(e.typerr);
}

