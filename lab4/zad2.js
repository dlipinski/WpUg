/* jshint strict: global, esversion: 6, devel: true */
'use strict';

String.prototype.nbsp = function () {
    return this.replace(new RegExp('[aiowz](\n)* ', 'g'), '&nbsp;');
};

let tekst = 'Ala i As poszli w las';

console.log(tekst.nbsp());