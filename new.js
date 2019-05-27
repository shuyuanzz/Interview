// 手动实现一个 new 关键字的功能的函数 _new(fun, args) --> new fun(args).
function _new(func, args) {
    if (typeof func !== 'function') {
        console.log(`the first arg must be a function`);
    }
    let obj = Object.create(func.prototype);
    res = func.call(obj,args);
    if(res !== null && (typeof res === 'function' || typeof res ==='object')) {
    return res;
    }
    return obj;
}