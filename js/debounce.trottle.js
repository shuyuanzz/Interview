//节流 在一定时间内只能触发一次，用户频繁触发一个比较耗时的操作的时候。
function trottle(func, time) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            func(...args);
            timer = setTimeout(() => timer = null, time);
        }
    }
}

//防抖 要连续等待一定时间没有调用才可以执行，适用场景：用户输入的时候

function debounce(func, time) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func(...args), time)
    }
}