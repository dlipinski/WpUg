/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

var x=4;
console.log(x.typess);

const defFun = (fun, types) => {
    
    fun.typeConstr = types;
    
    return fun;
};

const appFun = (f, ...x) => {
   
    if (typeof(f) !== "function") throw ({ typerr: "First argument is not function!" });
    if (typeof(f.fun) !== "function") throw ({ typerr: "First argument attribute is not function!" });
    if (f.typeConstr === "undefined") throw ({ typerr: "First argument does not contain typeConstr attribute" });
    if(Object.prototype.toString.call(f.typeConstr) !== "[object Array]") throw ({ typerr: "First argument attribute not function!" });
    if (!(x.every( function (i) { return typeof(x[i]) === f.typeConstr[i] }))) throw ({ typerr: "Array does contain not string!" });
    
}

/*
try {
    const myFun = defFun((a, b) => a + b, ['number', 'number']);
} catch (e) {
    console.log(e.typerr);
}
*/

