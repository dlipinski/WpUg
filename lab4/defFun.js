/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

const defFun = (fun, types) => {
    
    if (typeof(fun) !== "function") throw ({ typerr: "First argument is not function!" });
    if (Object.prototype.toString.call(types) !== "[object Array]") throw ({ typerr: "Second argument is not Array!" });
    if (!(types.every( function (i) { return typeof(i) === "string" }))) throw ({ typerr: "Array does contain not string!" });
    
    fun.typeConstr = types;
    
    return fun;
};


try {
    const myFun = defFun((a, b) => a + b, ['number', 'number']);
} catch (e) {
    console.log(e.typerr);
}





const appFun = (f, args) => {
    return 1;
};
