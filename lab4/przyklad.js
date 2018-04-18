/* jshint strict: global, esversion: 6, devel: true */
'use strict';

/* deklaracja "let" */
for (let i=0; i < 5; i++) {
    console.log(i);
}

/* lambda wyrażenia */
var f1 = (a, b) => a + b;

var f2 = (a, b) => { return a+b; }

var f3 = (a, b) => {
    let c = a+b;
    return c;
};

console.log(f1(1,2));
