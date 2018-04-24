/* jshint strict: global, esversion: 6, devel: true */
'use strict';

String.prototype.podstaw = function (data) {
    let target = this;
    for (var property in data){
        target = target.replace(new RegExp('{'+property+'}','g'),data[property]);
    }
    return target;
};


let szablon =
'<table border="{border}">' +
'  <tr><td>{first}</td><td>{last}</td></tr>' +
'</table>';


let dane = {
    first: "Jan",
    last:  "Kowalski",
    pesel: "97042176329"
};

console.log(szablon.podstaw(dane));