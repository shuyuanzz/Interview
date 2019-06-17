function checkType (target) {
    return Object.prototype.toString.call(target).slice(8,-1);
}
function clone (target) {
    let result;
    if(checkType(target) === 'Object') {
        result = {};
    }else if (checkType(target) === 'Array') {
        result = [];
    }else {
        return target;
    }
    for(let i in target) {
        if(checkType(i) === 'Object' || checkType(i) === 'Array') {
            result[i] = clone(i);
        }else {
            result[i] = target[i];
            return result;
        }
    }
    return result;
}
