# Interview
前端面试总结
### <a href="#js部分">js</a>
### <a href="#css部分">css</a>
### <a href="#webpack">webpack</a>
### <a name="js部分">js</a>
### <a href="#每日面试题部分">每日面试题遗漏</a>

1. js的数据类型  

js总共有六种基本数据类型————Undefined Null Boolean String Symbol(Es6新增的一种类字符串类型，来表示一种独一无二的值)，还有一种复杂数据类型Object（也可以说是引用数据类型）。  

二者的区别：  
基本类型的值储存在栈内存中，引用类型的值储存在堆内存中，在赋值过程中，基本类型（值类型）是将值赋值给变量。而引用类型是将指向该值的指针（存储在栈内存中）赋值给变量，从而导致如下结果
```
// 基本类型
var a = 10
var b = a
b = 20
console.log(a)  // 10
console.log(b)  // 20
//复制代码上述代码中，a b都是值类型，两者分别修改赋值，相互之间没有任何影响。再看引用类型的例子：
// 引用类型
var a = {x: 10, y: 20}
var b = a
b.x = 100
b.y = 200
console.log(a)  // {x: 100, y: 200}
console.log(b)  // {x: 100, y: 200}
//复制代码上述代码中，a b都是引用类型。在执行了b = a之后，修改b的属性值，a的也跟着变化。因为a和b都是引用类型，指向了同一个内存地址，即两者引用的是同///一个值，因此b修改属性时，a的值随之改动
```
2. 数据类型的判断  

1）type of 返回一个表示数据类型的字符串(主要用来检测基本类型，除了`type of null //undifined` 和 `type of Function  = Function`之外其它基本数据类型正常返回，复杂数据类型全部都为Object)  

2） nstance of:  （用来检测引用类型）
如果给定的类型是引用类型 instanceof 是根据原型链去识别，如果给定的类型是基本类型，instanceof会永远返回false  

3）也可以通过constructor去检测，但是constructor是有可能被覆盖和重写的，有一定的不准确性  

4）Object.prototype.toString.call()，最准确最常用的方式

3. 浅拷贝深拷贝
浅拷贝只复制指向某个对象的指针，而不是赋值这个对象本身，新旧变量还是共享的同一块堆内存。
浅拷贝实现方式  
```
Object.assign()：需注意的是目标对象只有一层的时候，是深拷贝
Array.prototype.concat()
Array.prototype.slice()
```
而深拷贝是直接开辟一个新的堆内存空间去复制整个对象的值
深拷贝实现方式
```
lodash _.cloneDeep方法;
JSON.parse(JSON.stringify());
手写一个递归方法
```

4. 执行上下文和执行栈
执行上下文就是js代码被解析和执行时所在的环境的抽线概念，js中执行的任何代码都时在执行上下文中运行，执行上下文的生命周起包括创建阶段，执行阶段，回收阶段  

1） 创建阶段  
创建变量对象
创建作用域链
确定this指向
这是因为当函数执行的时候,首先会形成一个新的私有的作用域，然后依次按照如下的步骤执行：

如果有形参，先给形参赋值
进行私有作用域中的预解释，函数声明优先级比变量声明高，最后后者会被前者所覆盖，但是可以重新赋值
私有作用域中的代码从上到下执行 


函数多了，就有多个函数执行上下文，每次调用函数创建一个新的执行上下文，那如何管理创建的那么多执行上下文呢？
JavaScript 引擎创建了执行栈来管理执行上下文。可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。  

从上面的流程图，我们需要记住几个关键点：  

JavaScript执行在单线程上，所有的代码都是排队执行。
一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行完成后，当前函数的执行上下文出栈，并等待垃圾回收。
浏览器的JS执行引擎总是访问栈顶的执行上下文。
全局上下文只有唯一的一个，它在浏览器关闭时出栈。

5. 作用域和作用域链  

在ES6之前就只有两个作用域： 函数作用域和全局作用域，ES6新增了块级作用域 （let,const 的出现）。
作用域就可以比作是一个独立的地盘，里面的变量外面访问到，这样的话可以用来防止命名冲突。  
访问变量 是一个由内而外的过程（在本作用域没有找到就去外面的一层作用域里面去找） 这里有一个自由变量的概念 作用域中使用到了 在本作用域中没有定义的变量（在作用域外面定义了）就叫做自由变量 这个由内而外的过程类似于一个链结构一样，这就是作用域链。

6. 闭包

当一个函数它的返回值是另外一个函数时，并且另外一个函数使用到了它的父级函数的参数或者变量，这种方式就叫做闭包。

好处：封装私有变量，隔离作用域。
坏处：当父级函数运行完后，有些变量的内存空间无法得到释放，当闭包嵌套过深会导致内存占用过大的问题，也有可能会导致内存泄漏（最好的办法当返回的函数执行完后将变量指向null）。  

7. this的指向问题

总体概况就是谁调用就指向谁（function调用 function this指向window），可通过 call apply bind来改变this指向。

8. EventLoop
常见的宏任务和微任务
宏任务：script(整体代码)、setTimeout、setInterval、I/O、事件、postMessage、 MessageChannel、setImmediate (Node.js)
微任务：Promise.then、 MutaionObserver、process.nextTick (Node.js)
1.执行栈所有的同步任务都在主线程执行 2.异步任务会在异步处理模块执行，执行后的回调函数放入任务队列 3. 执行栈空后，会将任务队列中的第一个任务压入执行栈中执行 4.不断重复第三步（也就是说至主线程空了就不断执行第三部）

先执行同步代码，和异步代码不是回调的部分（如果遇到宏任务就将该任务压入宏任务队列） 将异步代码的回调部分放入微任务队列中，等执行栈中的所有任务执行完后，开始执行微任务队列中的代码，等微任务队列中的任务执行完后，最后执行宏任务的代码。

9. async await
其中 await 前面的代码 是同步的，调用此函数时会直接执行；而 await bar(); 这句可以被转换成 Promise.resolve(bar())；await 后面的代码 则会被放到 Promise 的 then() 方法里。因此上面的代码可以被转换成如下形式，这样是不是就很清晰了？
function foo() {
  // await 前面的代码
  Promise.resolve(bar()).then(() => {
    // await 后面的代码
  });
}

function bar() {
  // do something...
}

foo();

10.  原型和原型链
每一个构造函数都有一个prototype的对象，也就是原型对象，原型对象里面会自动生成一个constructor（构造函数） 它指向构造函数本身。
```
function Shu () {

}
let yuan = new shu ();
```
这样的话yuan可以通过一个叫做_proto_ 的指针来访问 Shu的原型对象，这样一次连接就形成了一条链。
这就是原型链；

11. 继承

查看inherit.js

12. Dom 事件模型和事件流
1.Dom事件模型分为冒泡和捕获
捕获是从window自上而下到目标节点
冒泡是自下而上从目标节点到window
2.阻止冒泡
通过event.stoppPropagation()来阻止冒泡。
3.事件委托
将事件监听挂载在父节点上面，通过冒泡来触发事件
优点
节省内存、看起来更简洁。

13. Bom
与浏览器交互

14. 跨域
1.JSONP 利用同源策略对scripts标签不受限制来实现，只支持get请求
2.CORS:通过服务端设置一个Access-Control-Allow-Origin来实现
3.通过node中间件代理或者是nginx反向代理去实现

15. localstorage,sessionStorage,cookie的区别
cookie存储在客户端，用来与服务器交互，容量小（session cookie（没有过期时间，浏览器关闭后自动删除））
sessionStorage，localstorage存储在客户端，容量比较大 （sessionStorage有过期时间，localstorage永久）

16. 模块化
commonjs 用在服务端（随着node.js的出现诞生），同步加载模块
amd 依赖前置，异步加载
cmd 依赖就近 其实也是异步加载
es6

17. promise的用法s


### <a name="css部分">css</a>

1. 垂直居中实现

使用Flex

只需要在父盒子设置：display: flex; justify-content: center;align-items: center;

使用 CSS3 transform

父盒子设置:display:relative
Div 设置: transform: translate(-50%，-50%);position: absolute;top: 50%;left: 50%;

2. position

static:默认位置。 在一般情况下，我们不需要特别的去声明它，但有时候遇到继承的情况，我们不愿意见到元素所继承的属性影响本身，从而可以用Position:static取消继承，即还原元素定位的默认值。设置为 static 的元素，它始终会处于页面流给予的位置(static 元素会忽略任何 top、 bottom、left 或 right 声明)。一般不常用。
relative:相对定位。 相对定位是相对于元素默认的位置的定位，它偏移的 top，right，bottom，left 的值都以它原来的位置为基准偏移，而不管其他元素会怎么 样。注意 relative 移动后的元素在原来的位置仍占据空间。
absolute:绝对定位。 设置为 absolute 的元素，如果它的 父容器设置了 position 属性，并且 position 的属性值为 absolute 或者 relative，那么就会依据父容器进行偏移。如果其父容器没有设置 position 属性，那么偏移是以 body 为依据。注意设置 absolute 属性的元素在标准流中不占位置。
fixed:固定定位。 位置被设置为 fixed 的元素，可定位于相对于浏览器窗口的指定坐标。不论窗口滚动与否，元素都会留在那个位置。它始终是以 body 为依据的。 注意设置 fixed 属性的元素在标准流中不占位置。

3. stickty

position 新增的一个属性，设置了stickty的属性，如果在屏幕范围内时它是正常布局，top，left不起作用，当离开屏幕范围内时，stickty相当于fixed。
 4. 浮动

 3.1 浮动相关知识
float属性的取值：

left：元素向左浮动。
right：元素向右浮动。
none：默认值。元素不浮动，并会显示在其在文本中出现的位置。

浮动的特性：

浮动元素会从普通文档流中脱离，但浮动元素影响的不仅是自己，它会影响周围的元素对齐进行环绕。
不管一个元素是行内元素还是块级元素，如果被设置了浮动，那浮动元素会生成一个块级框，可以设置它的width和height，因此float常常用于制作横向配列的菜单，可以设置大小并且横向排列。

浮动元素的展示在不同情况下会有不同的规则：

浮动元素在浮动的时候，其margin不会超过包含块的padding。PS：如果想要元素超出，可以设置margin属性
如果两个元素一个向左浮动，一个向右浮动，左浮动元素的marginRight不会和右浮动元素的marginLeft相邻。
如果有多个浮动元素，浮动元素会按顺序排下来而不会发生重叠的现象。
如果有多个浮动元素，后面的元素高度不会超过前面的元素，并且不会超过包含块。
如果有非浮动元素和浮动元素同时存在，并且非浮动元素在前，则浮动元素不会高于非浮动元素
浮动元素会尽可能地向顶端对齐、向左或向右对齐

重叠问题

行内元素与浮动元素发生重叠，其边框，背景和内容都会显示在浮动元素之上
块级元素与浮动元素发生重叠时，边框和背景会显示在浮动元素之下，内容会显示在浮动元素之上

clear属性
clear属性：确保当前元素的左右两侧不会有浮动元素。clear只对元素本身的布局起作用。
取值：left、right、both
3.2 父元素高度塌陷问题
为什么要清除浮动，父元素高度塌陷
解决父元素高度塌陷问题：一个块级元素如果没有设置height，其height是由子元素撑开的。对子元素使用了浮动之后，子元素会脱离标准文档流，也就是说，父级元素中没有内容可以撑开其高度，这样父级元素的height就会被忽略，这就是所谓的高度塌陷。
3.3 清除浮动的方法
方法1：给父级div定义 高度
原理：给父级DIV定义固定高度（height），能解决父级DIV 无法获取高度得问题。
优点：代码简洁
缺点：高度被固定死了，是适合内容固定不变的模块。（不推荐使用）
方法二：使用空元素，如<div class="clear"></div> (.clear{clear:both})
原理：添加一对空的DIV标签，利用css的clear:both属性清除浮动，让父级DIV能够获取高度。
优点：浏览器支持好
缺点：多出了很多空的DIV标签，如果页面中浮动模块多的话，就会出现很多的空置DIV了，这样感觉视乎不是太令人满意。（不推荐使用）
方法三：让父级div 也一并浮起来
这样做可以初步解决当前的浮动问题。但是也让父级浮动起来了，又会产生新的浮动问题。 不推荐使用
方法四：父级div定义 display:table
原理：将div属性强制变成表格
优点：不解
缺点：会产生新的未知问题。（不推荐使用）
方法五：父元素设置 overflow：hidden、auto；
原理：这个方法的关键在于触发了BFC。在IE6中还需要触发 hasLayout（zoom：1）
优点：代码简介，不存在结构和语义化问题
缺点：无法显示需要溢出的元素（亦不太推荐使用）
方法六：父级div定义 伪类:after 和 zoom
.clearfix:after{
    content:'.';
    display:block;
    height:0;
    clear:both;
    visibility: hidden;
}
.clearfix {zoom:1;}
复制代码原理：IE8以上和非IE浏览器才支持:after，原理和方法2有点类似，zoom(IE转有属性)可解决ie6,ie7浮动问题
优点：结构和语义化完全正确,代码量也适中，可重复利用率（建议定义公共类）
缺点：代码不是非常简洁（极力推荐使用）

5. BFC（块级格式化上下文）看网站

6. box-sizing 是什么

7. px，em，rem 的区别

js,css,react,redux,http,html，数据结构算法，常见情况

### <a name="webpack">webpack</a>

### <a name="每日面试题部分">每日面试题遗漏</a>
#### 2019/9/4
1. 在页面中导入样式时 link 和 import 有什么区别?
    1. link是XHTML标签，除了可以加载css之外还可以加载RSS等其它事物，@import属于css范畴，只能加载css。
    2. link引入css时，会在页面载入等时候同时加载，而@import会在页面完全载入后再加载。（在网速较慢等时候会出现，页面刚开始没有样式，闪烁一下后正常）
    3. link属于XHTML标签，没有任何兼容等问题，@import css 2.1提出，不兼容低版本浏览器。
    4. link支持使用js去改变样式，而import不支持。
2. 这是一道大题目，把考点拆成了4个小项；需要侯选人用递归算法实现（限制15行代码以内实现；限制时间10分钟内完成）：
a) 生成一个长度为5的空数组arr。
b) 生成一个（2－32）之间的随机整数rand。
c) 把随机数rand插入到数组arr内，如果数组arr内已存在与rand相同的数字，则重新生成随机数rand并插入到arr内[需要使用递归实现，不能使用for/while等循环]
d) 最终输出一个长度为5，且内容不重复的数组arr。
```
let arr = new Array(5);

let arr = new Array(5);
function getArr(index) {
    if(index === 5) {
        return arr
    }
    let a = Math.floor(Math.random() * 30 + 2) 
    if(arr.includes(a)) {
      return  getArr(index);
    }else {
        arr[index] = a;
      return getArr(index + 1)
    }
}
}
```
#### 2019/9/5
1 写一个方法去掉字符串中的空格.

```
function removeStrEmsp(str) {
    return str && str.replace(/\s+/g;,"");
}
```

#### 2019/9/6

1. 在页面上隐藏元素的方法有哪些?
  1. opciacty: 0
  2. display: none
  3. visibility: hidden
  4. z-index: -9999999999999
  5. transform: scale(0)
  6. margin-left: -100%
  7. position: relative; left: -100%
  8. width: 0; height: 0
2. 如何去除字符串最后一个指定符？
```
function removeTheLast(str, del) {
    if(typeof str !== 'string' || typeof del !== 'string') {
        throw('both of params must be string!');
    }
    const lastIndex = str.lastIndexOf(del);
    return str.substring(0,lastIndex) + str.substring(lastIndex+1,str.length);
}
```
#### 2019/9/10
1. 写一个方法把下划线命名转成大驼峰命名
```
function nameFormater(str) {
    if(typeof str !== 'string') {
        throw('params must be string')
    }
    while(str.includes('_')) {
        const index = str.indexOf('_');
        if(index ===  0 || index === str.length) continue
        const prevStr = str.substring(0,index);
        const upCase = str[index + 1].toUpperCase();
        const nextStr = str.substring(index + 2,str.length);
        str = prevStr+upCase+nextStr;
    }
    return str;
}

```

### 每日大厂面试题

#### 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？
在不带key的情况下，对于简单列表渲染类似于`<li>1</li>`来说diff节点会更快。
key的作用：
1. 更准确
因为带key就不是就地复用了，在sameNode函数 a.key === b.key对比中可以避免就地复用的情况。所以会更加准确。（react/vue 在diff过程中就可以准确的判别判别list中某一节点是新增了 删除了
 还是移动了）

2. 更快
利用key的唯一性生成map对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map会比遍历更快。)  
  


#### ['1', '2', '3'].map(parseInt) what & why ?

result: [1,NaN,Nan]
原因 map接受一个三个参数的callback （item,index,arr）parseInt(string,radix).
1. parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
2. parseInt('2', 1) //基数为1（1进制）表示的数中，最大值小于1，所以无法解析，返回NaN
3. parseInt('3', 2) //基数为2（2进制）表示的数中，最大值小于2，所以无法解析，返回NaN
用第三个来举例 3 不是二进制数所以返回NaN，101是二进制数.


#### 什么是防抖和节流？有什么区别？如何实现？

1. 防抖：当高频率的触发某个事件时，每隔一段时间才会执行一次，如果重新触发那就会重新计算这一段时间。
代码实现：
```
function debounce (func,time) {
    var timer = null;
    return function() {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this,arguments)
        }, time);
    }
}

```
2. 节流：当高频率的触发某个事件时，在n秒内只会执行一次。 
```
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
```

#### 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？
[详情请见](http://es6.ruanyifeng.com/#docs/set-map）
1. set 值不重复（可以用来做数组去重字符串去重，可以遍历）
2. map 键值对集合 （可以遍历）  
3. weakSet 值只能存储对象 并且对该对象是弱引用 在垃圾回收中不计入引用次数 不可遍历（常用来存储DOM节点 当DOM节点删除时 存储在weakSet里面对应DOM节点也会消失 防止内存泄漏）
4. weakMap 键只能是对象 并且对该对象是弱引用 在垃圾回收中不计入引用次数 不可遍历（常用来存储DOM节点 并且给该DOM节点添加额外信息 当DOM节点删除时 存储在weakMap里面对应DOM节点也会消失 防止内存泄漏）

#### 什么是深度优先遍历什么是广度优先遍历？并用它们来实现拷贝函数。

```
深度优先：
function deepTraversal (node , nodeList = []) {
    if(node !== null) {
        nodeList.push(node);
        let children =  node.children;
        for(let i = 0; i< children.length; i++) {
        deepTraversal(children[i],nodeList)
        }
    }
    return nodeList
}
广度优先：
function widthTraversal(node) {
    let queue = [];
    let nodeList = [];
    if(node) {
        queue.push(node);
        while(queue.length) {
            const item  = queue.shift();
            const children = item.children;
            nodeList.push(item);
            for(i = 0; i< children.length; i++) {
                    queue.push(children[i])
            }
        }
    }
    return nodeList;
}
```
#### ES5/ES6 的继承除了写法以外还有什么区别？

[详情请见](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/20)

1. class声明和构造函数声明一样，都会被提升 不过class会进入暂时性死区，类似于let const 声明。 
2. class声明内部会采用严格模式
3. class里面所有的方法都不可遍历
4. class里面对所有方法是没有prototype 和 [[constructor]]的 不能被new 调用
5. class只能用new调用 
6. class内部无法重写类本身


#### setTimeout、Promise、Async/Await 的区别？
  
1. setTimeout 里面的回调方法会放在宏任务队列中 需要等带执行栈中的同步代码 和 微任务队列中的回调方法执行完以后才会执行该回调方法。
2. promise.then里面等方法会放在微任务队列中 需等待执行栈中的同步代码执行完毕。
3. async函数表示函数里面可能会有异步方法，await后面跟一个表达式，async方法执行时，遇到await会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。

#### 请写出下面代码的运行结果

```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

result: 
script start => async1 start => async2 => promise1 => script end => async1 end => promise2 => setTimeout


#### 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组 

```
function flatSortList(arr, list = []) {
  if (arr instanceof Array) {
    for (let i = 0; i <= arr.length; i++) {
        flatSortList(arr[i],list)
    }
  } else if (arr) {
    list.push(arr);
  }
  return [...new Set(list.sort((a,b) => a-b))];
}
```

或者
```
Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})
```

#### （滴滴、挖财、微医、海康）JS 异步解决方案的发展历程以及优缺点

1. 回调函数   

缺点在于： 容易出现回调地狱，不能用try catch 捕获错误

回调地狱的根本问题在于：

1. 缺乏顺序性： 回调地狱导致的调试困难，和大脑的思维方式不符
2. 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身，即（控制反转）
3. 嵌套函数过多的多话，很难处理错误

2. promise 

优点: promise实现了链式调用，解决的回调地狱的问题，使调理更加清晰。
缺点: promise无法取消，只能通过回调函数来捕获错误。

3. Generator

特点：可以控制函数的执行，可以配合 co 函数库使用
缺点：需要搭配co模块来执行 语意上来说不够明显 

4. Async/await
async、await 是异步的终极解决方案

优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题

缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。

