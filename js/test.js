


function sleep(time) {
    return new Promise(resolve => {setTimeout(resolve, time);})
}
async function doSomething() {
    console.log('code begain');
    await sleep(1000);
    console.log('code after sleep');
}