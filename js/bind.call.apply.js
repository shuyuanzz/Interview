Function.prototype.bind = function (context, ...bindArgs) {
    let func = this;
    context = context || window;
    return function (...callArgs) {
        let args = bindArgs.concat(callArgs);
        if (this instanceof func) {
            return new func(...args);
        }
        return func.call(context, ...args);
    }
}
//通过隐式绑定来实现
Function.prototype.call = function (context, ...callArgs) {
    context = context || window;
    context.func = this;
    let result = context.func(...callArgs);
    delete context.func;
    return result;
}

Function.prototype.apply = function(context,applyArgs) {
    context = context || window;
    context.func = this;
    res = context.func(...applyArgs);
    delete contex.func;
    return result;
}