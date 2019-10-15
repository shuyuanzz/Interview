function _new(func, args) {
    if(typeof func !== 'function') {
        console.log('the first arguement must be function');
    }
    const obj = Object.create(func);
    const res = obj.apply(func,args);
    if(res && (typeof res === 'function' || typeof res ==='object')) {
        return res
    }
    return obj;
}
