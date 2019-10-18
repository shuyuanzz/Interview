function flatten (arr) {
    if(!arr instanceof Array) {
        throw new Error('arguements must be array');
    }
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}