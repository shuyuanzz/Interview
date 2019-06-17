//递归
function fibonacci(n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2)
    }
}
//非递归
function fibonacci(n) {
    if (n <= 1) {
        return n
    } else {
        for (let i = 1; i < n; i++) {
            var a = 0,b = 1,c;
            c = b;
            b = a+b;
            a = c;
        }
        return b;
    }
}