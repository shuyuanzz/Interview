(function jsonp() {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.src = 'http://domain:port/testJSONP?a=1&b=2&callback=foo';
    head.appendChild(script);
})()

function foo(data) {
    console.log('通过后台获得的数据是', data);
}

