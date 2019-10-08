function trottle (func,time) {
    var timer = null;
    return function() {
        if(!timer) {
            func();
            timer = setTimeout(() => {
                timer = null;
            }, time);
        }
    }
}
function debounce (func,time) {
    var timer = null;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this,arguments)
        }, time);
    }
}