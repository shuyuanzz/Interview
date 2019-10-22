# Interview

前端面试总结

### <a href="#js部分">js</a>

### <a href="#css部分">css</a>

### <a href="#webpack">webpack</a>

### <a name="js部分">js</a>

### <a href="#每日面试题部分">每日面试题遗漏</a>

1. js 的数据类型

js 总共有六种基本数据类型————Undefined Null Boolean String Symbol(Es6 新增的一种类字符串类型，来表示一种独一无二的值)，还有一种复杂数据类型 Object（也可以说是引用数据类型）。

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

1）type of 返回一个表示数据类型的字符串(主要用来检测基本类型，除了`type of null //undifined` 和 `type of Function = Function`之外其它基本数据类型正常返回，复杂数据类型全部都为 Object)

2） nstance of: （用来检测引用类型）
如果给定的类型是引用类型 instanceof 是根据原型链去识别，如果给定的类型是基本类型，instanceof 会永远返回 false

3）也可以通过 constructor 去检测，但是 constructor 是有可能被覆盖和重写的，有一定的不准确性

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
   执行上下文就是 js 代码被解析和执行时所在的环境的抽线概念，js 中执行的任何代码都时在执行上下文中运行，执行上下文的生命周起包括创建阶段，执行阶段，回收阶段

1） 创建阶段  
创建变量对象
创建作用域链
确定 this 指向
这是因为当函数执行的时候,首先会形成一个新的私有的作用域，然后依次按照如下的步骤执行：

如果有形参，先给形参赋值
进行私有作用域中的预解释，函数声明优先级比变量声明高，最后后者会被前者所覆盖，但是可以重新赋值
私有作用域中的代码从上到下执行

函数多了，就有多个函数执行上下文，每次调用函数创建一个新的执行上下文，那如何管理创建的那么多执行上下文呢？
JavaScript 引擎创建了执行栈来管理执行上下文。可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。

从上面的流程图，我们需要记住几个关键点：

JavaScript 执行在单线程上，所有的代码都是排队执行。
一开始浏览器执行全局的代码时，首先创建全局的执行上下文，压入执行栈的顶部。
每当进入一个函数的执行就会创建函数的执行上下文，并且把它压入执行栈的顶部。当前函数执行完成后，当前函数的执行上下文出栈，并等待垃圾回收。
浏览器的 JS 执行引擎总是访问栈顶的执行上下文。
全局上下文只有唯一的一个，它在浏览器关闭时出栈。

5. 作用域和作用域链

在 ES6 之前就只有两个作用域： 函数作用域和全局作用域，ES6 新增了块级作用域 （let,const 的出现）。
作用域就可以比作是一个独立的地盘，里面的变量外面访问到，这样的话可以用来防止命名冲突。  
访问变量 是一个由内而外的过程（在本作用域没有找到就去外面的一层作用域里面去找） 这里有一个自由变量的概念 作用域中使用到了 在本作用域中没有定义的变量（在作用域外面定义了）就叫做自由变量 这个由内而外的过程类似于一个链结构一样，这就是作用域链。

6. 闭包

当一个函数它的返回值是另外一个函数时，并且另外一个函数使用到了它的父级函数的参数或者变量，这种方式就叫做闭包。

好处：封装私有变量，隔离作用域。
坏处：当父级函数运行完后，有些变量的内存空间无法得到释放，当闭包嵌套过深会导致内存占用过大的问题，也有可能会导致内存泄漏（最好的办法当返回的函数执行完后将变量指向 null）。

7. this 的指向问题

总体概况就是谁调用就指向谁（function 调用 function this 指向 window），可通过 call apply bind 来改变 this 指向。

8. EventLoop
   常见的宏任务和微任务
   宏任务：script(整体代码)、setTimeout、setInterval、I/O、事件、postMessage、 MessageChannel、setImmediate (Node.js)
   微任务：Promise.then、 MutaionObserver、process.nextTick (Node.js) 1.执行栈所有的同步任务都在主线程执行 2.异步任务会在异步处理模块执行，执行后的回调函数放入任务队列 3. 执行栈空后，会将任务队列中的第一个任务压入执行栈中执行 4.不断重复第三步（也就是说至主线程空了就不断执行第三部）

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

10. 原型和原型链
    每一个构造函数都有一个 prototype 的对象，也就是原型对象，原型对象里面会自动生成一个 constructor（构造函数） 它指向构造函数本身。

```
function Shu () {

}
let yuan = new shu ();
```

这样的话 yuan 可以通过一个叫做*proto* 的指针来访问 Shu 的原型对象，这样一次连接就形成了一条链。
这就是原型链；

11. 继承

查看 inherit.js

12. Dom 事件模型和事件流
    1.Dom 事件模型分为冒泡和捕获
    捕获是从 window 自上而下到目标节点
    冒泡是自下而上从目标节点到 window 2.阻止冒泡
    通过 event.stoppPropagation()来阻止冒泡。 3.事件委托
    将事件监听挂载在父节点上面，通过冒泡来触发事件
    优点
    节省内存、看起来更简洁。

13. Bom
    与浏览器交互

14. 跨域
    1.JSONP 利用同源策略对 scripts 标签不受限制来实现，只支持 get 请求
    2.CORS:通过服务端设置一个 Access-Control-Allow-Origin 来实现 3.通过 node 中间件代理或者是 nginx 反向代理去实现

15. localstorage,sessionStorage,cookie 的区别
    cookie 存储在客户端，用来与服务器交互，容量小（session cookie（没有过期时间，浏览器关闭后自动删除））
    sessionStorage，localstorage 存储在客户端，容量比较大 （sessionStorage 有过期时间，localstorage 永久）

16. 模块化
    commonjs 用在服务端（随着 node.js 的出现诞生），同步加载模块
    amd 依赖前置，异步加载
    cmd 依赖就近 其实也是异步加载
    es6

17. promise 的用法 s

### <a name="css部分">css</a>

1. 垂直居中实现

使用 Flex

只需要在父盒子设置：display: flex; justify-content: center;align-items: center;

使用 CSS3 transform

父盒子设置:display:relative
Div 设置: transform: translate(-50%，-50%);position: absolute;top: 50%;left: 50%;

2. position

static:默认位置。 在一般情况下，我们不需要特别的去声明它，但有时候遇到继承的情况，我们不愿意见到元素所继承的属性影响本身，从而可以用 Position:static 取消继承，即还原元素定位的默认值。设置为 static 的元素，它始终会处于页面流给予的位置(static 元素会忽略任何 top、 bottom、left 或 right 声明)。一般不常用。
relative:相对定位。 相对定位是相对于元素默认的位置的定位，它偏移的 top，right，bottom，left 的值都以它原来的位置为基准偏移，而不管其他元素会怎么 样。注意 relative 移动后的元素在原来的位置仍占据空间。
absolute:绝对定位。 设置为 absolute 的元素，如果它的 父容器设置了 position 属性，并且 position 的属性值为 absolute 或者 relative，那么就会依据父容器进行偏移。如果其父容器没有设置 position 属性，那么偏移是以 body 为依据。注意设置 absolute 属性的元素在标准流中不占位置。
fixed:固定定位。 位置被设置为 fixed 的元素，可定位于相对于浏览器窗口的指定坐标。不论窗口滚动与否，元素都会留在那个位置。它始终是以 body 为依据的。 注意设置 fixed 属性的元素在标准流中不占位置。

3. stickty

position 新增的一个属性，设置了 stickty 的属性，如果在屏幕范围内时它是正常布局，top，left 不起作用，当离开屏幕范围内时，stickty 相当于 fixed。

4.  浮动

3.1 浮动相关知识
float 属性的取值：

left：元素向左浮动。
right：元素向右浮动。
none：默认值。元素不浮动，并会显示在其在文本中出现的位置。

浮动的特性：

浮动元素会从普通文档流中脱离，但浮动元素影响的不仅是自己，它会影响周围的元素对齐进行环绕。
不管一个元素是行内元素还是块级元素，如果被设置了浮动，那浮动元素会生成一个块级框，可以设置它的 width 和 height，因此 float 常常用于制作横向配列的菜单，可以设置大小并且横向排列。

浮动元素的展示在不同情况下会有不同的规则：

浮动元素在浮动的时候，其 margin 不会超过包含块的 padding。PS：如果想要元素超出，可以设置 margin 属性
如果两个元素一个向左浮动，一个向右浮动，左浮动元素的 marginRight 不会和右浮动元素的 marginLeft 相邻。
如果有多个浮动元素，浮动元素会按顺序排下来而不会发生重叠的现象。
如果有多个浮动元素，后面的元素高度不会超过前面的元素，并且不会超过包含块。
如果有非浮动元素和浮动元素同时存在，并且非浮动元素在前，则浮动元素不会高于非浮动元素
浮动元素会尽可能地向顶端对齐、向左或向右对齐

重叠问题

行内元素与浮动元素发生重叠，其边框，背景和内容都会显示在浮动元素之上
块级元素与浮动元素发生重叠时，边框和背景会显示在浮动元素之下，内容会显示在浮动元素之上

clear 属性
clear 属性：确保当前元素的左右两侧不会有浮动元素。clear 只对元素本身的布局起作用。
取值：left、right、both
3.2 父元素高度塌陷问题
为什么要清除浮动，父元素高度塌陷
解决父元素高度塌陷问题：一个块级元素如果没有设置 height，其 height 是由子元素撑开的。对子元素使用了浮动之后，子元素会脱离标准文档流，也就是说，父级元素中没有内容可以撑开其高度，这样父级元素的 height 就会被忽略，这就是所谓的高度塌陷。
3.3 清除浮动的方法
方法 1：给父级 div 定义 高度
原理：给父级 DIV 定义固定高度（height），能解决父级 DIV 无法获取高度得问题。
优点：代码简洁
缺点：高度被固定死了，是适合内容固定不变的模块。（不推荐使用）
方法二：使用空元素，如<div class="clear"></div> (.clear{clear:both})
原理：添加一对空的 DIV 标签，利用 css 的 clear:both 属性清除浮动，让父级 DIV 能够获取高度。
优点：浏览器支持好
缺点：多出了很多空的 DIV 标签，如果页面中浮动模块多的话，就会出现很多的空置 DIV 了，这样感觉视乎不是太令人满意。（不推荐使用）
方法三：让父级 div 也一并浮起来
这样做可以初步解决当前的浮动问题。但是也让父级浮动起来了，又会产生新的浮动问题。 不推荐使用
方法四：父级 div 定义 display:table
原理：将 div 属性强制变成表格
优点：不解
缺点：会产生新的未知问题。（不推荐使用）
方法五：父元素设置 overflow：hidden、auto；
原理：这个方法的关键在于触发了 BFC。在 IE6 中还需要触发 hasLayout（zoom：1）
优点：代码简介，不存在结构和语义化问题
缺点：无法显示需要溢出的元素（亦不太推荐使用）
方法六：父级 div 定义 伪类:after 和 zoom
.clearfix:after{
content:'.';
display:block;
height:0;
clear:both;
visibility: hidden;
}
.clearfix {zoom:1;}
复制代码原理：IE8 以上和非 IE 浏览器才支持:after，原理和方法 2 有点类似，zoom(IE 转有属性)可解决 ie6,ie7 浮动问题
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
   1. link 是 XHTML 标签，除了可以加载 css 之外还可以加载 RSS 等其它事物，@import 属于 css 范畴，只能加载 css。
   2. link 引入 css 时，会在页面载入等时候同时加载，而@import 会在页面完全载入后再加载。（在网速较慢等时候会出现，页面刚开始没有样式，闪烁一下后正常）
   3. link 属于 XHTML 标签，没有任何兼容等问题，@import css 2.1 提出，不兼容低版本浏览器。
   4. link 支持使用 js 去改变样式，而 import 不支持。
2. 这是一道大题目，把考点拆成了 4 个小项；需要侯选人用递归算法实现（限制 15 行代码以内实现；限制时间 10 分钟内完成）：
   a) 生成一个长度为 5 的空数组 arr。
   b) 生成一个（2－32）之间的随机整数 rand。
   c) 把随机数 rand 插入到数组 arr 内，如果数组 arr 内已存在与 rand 相同的数字，则重新生成随机数 rand 并插入到 arr 内[需要使用递归实现，不能使用 for/while 等循环]
   d) 最终输出一个长度为 5，且内容不重复的数组 arr。

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
1. display: none
1. visibility: hidden
1. z-index: -9999999999999
1. transform: scale(0)
1. margin-left: -100%
1. position: relative; left: -100%
1. width: 0; height: 0
1. 如何去除字符串最后一个指定符？

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

在不带 key 的情况下，对于简单列表渲染类似于`<li>1</li>`来说 diff 节点会更快。
key 的作用：

1. 更准确
   因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。（react/vue 在 diff 过程中就可以准确的判别判别 list 中某一节点是新增了 删除了
   还是移动了）

2. 更快
   利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map 会比遍历更快。)

#### ['1', '2', '3'].map(parseInt) what & why ?

result: [1,NaN,Nan]
原因 map 接受一个三个参数的 callback （item,index,arr）parseInt(string,radix).

1. parseInt('1', 0) //radix 为 0 时，且 string 参数不以“0x”和“0”开头时，按照 10 为基数处理。这个时候返回 1
2. parseInt('2', 1) //基数为 1（1 进制）表示的数中，最大值小于 1，所以无法解析，返回 NaN
3. parseInt('3', 2) //基数为 2（2 进制）表示的数中，最大值小于 2，所以无法解析，返回 NaN
   用第三个来举例 3 不是二进制数所以返回 NaN，101 是二进制数.

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

2. 节流：当高频率的触发某个事件时，在 n 秒内只会执行一次。

```
function trottle (func,time) {
    var timer = null;
    return function() {
        if(!timer) {
            func.apply(this,arguments);
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
3. weakSet 值只能存储对象 并且对该对象是弱引用 在垃圾回收中不计入引用次数 不可遍历（常用来存储 DOM 节点 当 DOM 节点删除时 存储在 weakSet 里面对应 DOM 节点也会消失 防止内存泄漏）
4. weakMap 键只能是对象 并且对该对象是弱引用 在垃圾回收中不计入引用次数 不可遍历（常用来存储 DOM 节点 并且给该 DOM 节点添加额外信息 当 DOM 节点删除时 存储在 weakMap 里面对应 DOM 节点也会消失 防止内存泄漏）

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

1. class 声明和构造函数声明一样，都会被提升 不过 class 会进入暂时性死区，类似于 let const 声明。
2. class 声明内部会采用严格模式
3. class 里面所有的方法都不可遍历
4. class 里面对所有方法是没有 prototype 和 [[constructor]]的 不能被 new 调用
5. class 只能用 new 调用
6. class 内部无法重写类本身

#### setTimeout、Promise、Async/Await 的区别？

1. setTimeout 里面的回调方法会放在宏任务队列中 需要等带执行栈中的同步代码 和 微任务队列中的回调方法执行完以后才会执行该回调方法。
2. promise.then 里面等方法会放在微任务队列中 需等待执行栈中的同步代码执行完毕。
3. async 函数表示函数里面可能会有异步方法，await 后面跟一个表达式，async 方法执行时，遇到 await 会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。

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

缺点在于： 容易出现回调地狱，不能用 try catch 捕获错误

回调地狱的根本问题在于：

1. 缺乏顺序性： 回调地狱导致的调试困难，和大脑的思维方式不符
2. 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身，即（控制反转）
3. 嵌套函数过多的多话，很难处理错误

4. promise

优点: promise 实现了链式调用，解决的回调地狱的问题，使调理更加清晰。
缺点: promise 无法取消，只能通过回调函数来捕获错误。

3. Generator

特点：可以控制函数的执行，可以配合 co 函数库使用
缺点：需要搭配 co 模块来执行 语意上来说不够明显

4. Async/await
   async、await 是异步的终极解决方案

优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题

缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。

#### Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

```
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})

promise.then(() => {
  console.log(3)
})

console.log(4)
```

执行结果是：1243
promise 构造函数是同步执行的，then 方法是异步执行的

#### 如何实现一个 new

```
function _new(func, args) {
  if(typeof func !== 'function') {
    throw Error('the first arguement must be function')
  }
  let obj = Object.create(func.prototype)
  let res = func.all(obj,args)
  if(res && (typeof res === 'function' || typeof res ==='object')) {
    return res
  }
  return obj
}

```

#### 简单讲解一下 http2 的多路复用

在 HTTP/1 中，每次请求都会建立一次 HTTP 连接，也就是我们常说的 3 次握手 4 次挥手，这个过程在一次请求过程中占用了相当长的时间，即使开启了 Keep-Alive ，解决了多次连接的问题，但是依然有两个效率上的问题：

第一个：串行的文件传输。当请求 a 文件时，b 文件只能等待，等待 a 连接到服务器、服务器处理文件、服务器返回文件，这三个步骤。我们假设这三步用时都是 1 秒，那么 a 文件用时为 3 秒，b 文件传输完成用时为 6 秒，依此类推。（注：此项计算有一个前提条件，就是浏览器和服务器是单通道传输）
第二个：连接数过多。我们假设 Apache 设置了最大并发数为 300，因为浏览器限制，浏览器发起的最大请求数为 6，也就是服务器能承载的最高并发为 50，当第 51 个人访问时，就需要等待前面某个请求处理完成。
HTTP/2 的多路复用就是为了解决上述的两个性能问题。
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream）。
帧代表着最小的数据单位，每个帧会标识出该帧属于哪个流，流也就是多个帧组成的数据流。
多路复用，就是在一个 TCP 连接中可以存在多条流。换句话说，也就是可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求。通过这个技术，可以避免 HTTP 旧版本中的队头阻塞问题，极大的提高传输性能。

#### 谈谈你对三次握手四次挥手的理解

三次握手

第一次握手：客户端给服务端发一个 SYN 报文，并指明客户端的初始化序列号 ISN(c)。此时客户端处于 SYN_SEND 状态。
首部的同步位 SYN=1，初始序号 seq=x，SYN=1 的报文段不能携带数据，但要消耗掉一个序号。

第二次握手：服务器收到客户端的 SYN 报文之后，会以自己的 SYN 报文作为应答，并且也是指定了自己的初始化序列号 ISN(s)。同时会把客户端的 ISN + 1 作为 ACK 的值，表示自己已经收到了客户端的 SYN，此时服务器处于 SYN_REVD 的状态。
在确认报文段中 SYN=1，ACK=1，确认号 ack=x+1，初始序号 seq=y。

第三次握手：客户端收到 SYN 报文之后，会发送一个 ACK 报文，当然，也是一样把服务器的 ISN + 1 作为 ACK 的值，表示已经收到了服务端的 SYN 报文，此时客户端处于 ESTABLISHED 状态。服务器收到 ACK 报文之后，也处于 ESTABLISHED 状态，此时，双方已建立起了连接。

四次挥手

第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于 FIN_WAIT1 状态。
即发出连接释放报文段（FIN=1，序号 seq=u），并停止再发送数据，主动关闭 TCP 连接，进入 FIN_WAIT1（终止等待 1）状态，等待服务端的确认。
第二次挥手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 +1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 CLOSE_WAIT 状态。
即服务端收到连接释放报文段后即发出确认报文段（ACK=1，确认号 ack=u+1，序号 seq=v），服务端进入 CLOSE_WAIT（关闭等待）状态，此时的 TCP 处于半关闭状态，客户端到服务端的连接释放。客户端收到服务端的确认后，进入 FIN_WAIT2（终止等待 2）状态，等待服务端发出的连接释放报文段。
第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 LAST_ACK 的状态。
即服务端没有要向客户端发出的数据，服务端发出连接释放报文段（FIN=1，ACK=1，序号 seq=w，确认号 ack=u+1），服务端进入 LAST_ACK（最后确认）状态，等待客户端的确认。
第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 +1 作为自己 ACK 报文的序列号值，此时客户端处于 TIME_WAIT 状态。需要过一阵子以确保服务端收到自己的 ACK 报文之后才会进入 CLOSED 状态，服务端收到 ACK 报文之后，就处于关闭连接了，处于 CLOSED 状态。
即客户端收到服务端的连接释放报文段后，对此发出确认报文段（ACK=1，seq=u+1，ack=w+1），客户端进入 TIME_WAIT（时间等待）状态。此时 TCP 未释放掉，需要经过时间等待计时器设置的时间 2MSL 后，客户端才进入 CLOSED 状态。

#### React 中 setState 什么时候是同步的，什么时候是异步的？

如果是由 React 引发的事件处理（比如通过 onClick 引发的事件处理），调用 setState 不会同步更新 this.state，除此之外的 setState 调用会同步执行 this.state。所谓“除此之外”，指的是绕过 React 通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval 产生的异步调用

[具体链接]（https://github.com/sisterAn/blog/issues/26）

#### React setState 笔试题，下面的代码输出什么？

```
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log
    }, 0);
  }

  render() {
    return null;
  }
};
```

结果：0，0，2，3

下一次复习： 广度优先 => 简单讲解一下 http2 的多路复用 => 三次握手四次挥手

#### 介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？

[详情请见](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/22)

#### 有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣

1. Object.prototype.toString.call([]) 它可以检测所有的类型

```
Object.prototype.toString.call([])//[Objecr,Array]
```

2. instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

使用 instanceof 判断一个对象是否为数组，instanceof 会判断这个对象的原型链上是否会找到对应的 Array 的原型，找到返回 true，否则返回 false。

```
[]  instanceof Array; // true
```

但 instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

3.  Array.isArray()
    当检测 Array 实例时 isArray 优于 instanceof 因为它可以检测 iframe

Array.isArray() 与 Object.prototype.toString.call()

Array.isArray()是 ES5 新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

```
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```

#### 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

[详情请见](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/24)

#### 介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景?

观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知

#### 聊聊 Redux 和 Vuex 的设计思想

[详情请见](https://zhuanlan.zhihu.com/p/53599723)

#### 说说浏览器和 Node 事件循环的区别

[详情请见]（https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/26）

#### 介绍模块化发展历程

[详情请见]（https://www.processon.com/view/link/5c8409bbe4b02b2ce492286a#map）

#### 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取

用 var 声明的全局变量会放在顶层对象中 作为 window 对象的属性 用 let const 声明的全局变量不会在顶层对象中而是放在快级作用域中

#### 聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的

[详情请见]（https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/34）

#### 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']

```
const arrMerge = (arrSource, arrTarget) => {
  if (!arrSource instanceof Array || !arrTarget instanceof Array) {
    throw new Error("arguements must be array");
  }
  let res = [];
  let targetIndex = 0;
  for (let i = 0; i < arrSource.length; i++) {
      if(arrSource[i].indexOf(arrTarget[targetIndex]) !== -1) {
          res.push(arrSource[i]);
          if(i === arrSource.length - 1) res.push(arrTarget[targetIndex])
      }else {
          res.push(arrTarget[targetIndex]);
          res.push(arrSource[i]);
          targetIndex += 1;
      }
  }
  return res
};
```

#### 改造下面的代码，使之输出 0 - 9，写出你能想到的所有解法。

```
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
```

1.使用闭包

```
for (let i = 0; i< 10; i++){
    (function(i) {
        setTimeout(() => {
            console.log(i);
        }, 1000)
    })(i)
}
```

2.使用块级作用域

```
for (let i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
```

#### Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法

[详情请见]（https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/47）、

#### 下面代码打印什么内容 如果想让其打印10 或者 打印 20 该怎么做。

```
var b = 10;
(function b(){
   b = 20;
   console.log(b);
})();

```

1. 打印的是b这个函数 原因是 IIFE中的函数是函数表达式 不是函数声明 函数表达式和声明不同 函数名只在该函数内部有效，并且此绑定是常量绑定。 常量绑定在严格模式下给其赋值会报错 非严格模式下 给其赋值会无效
2. 输出10
```
var b = 10;
(function b(b){
   window.b = 20;
   console.log(b);
})(b);

```
3. 输出20

```
var b = 10;
(function b(b){
   var b = 20;
   console.log(b);
})(b);
```

#### 浏览器缓存读取规则
[详情请见](https://www.jianshu.com/p/54cc04190252)

#### 使用迭代的方式实现 flatten 函数

```
function flatten (arr) {
    if(!arr instanceof Array) {
        throw new Error('arguements must be array');
    }
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}
```
#### 下面代码中 a 在什么情况下会打印 1？

```
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}
```

#### 介绍下 BFC 及其应用
BFC 块级格式化上下文
[详情请见]（https://zhuanlan.zhihu.com/p/25321647）

#### 下面代码输出什么

```
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```

考察作用域和变量提升 结果： undifined => 10 => 20

#### 实现一个 sleep 函数

```
function sleep(time) {
    return new Promise(resolve => {setTimeout(resolve, time);})
}
async function doSomething() {
    console.log('code begain');
    await sleep(1000);
    console.log('code after sleep');
}
```

#### 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

根据MDN上对Array.sort()的解释，默认的排序方法会将数组元素转换为字符串，然后比较字符串中字符的UTF-16编码顺序来进行排序。所以'102' 会排在 '15' 前面。

#### 简述https握手的过程 以及如何验证证书的合法性

[详情请看]（https://yq.aliyun.com/articles/597667?utm_content=m_51050）

#### 输出以下代码执行的结果并解释为什么

```
var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```
push方法影响了数组的length属性和对应下标的值。
结果 Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
2: 1
3: 2
length: 4
push: ƒ push()
splice: ƒ splice()
__proto__: Object

#### 双向绑定和 vuex 是否冲突

[详情请见]（https://vuex.vuejs.org/zh/guide/forms.html）

#### call apply 的区别是什么 哪一个性能更好

Function.prototype.apply和Function.prototype.call 的作用是一样的，区别在于传入参数的不同；
第一个参数都是，指定函数体内this的指向；
第二个参数开始不同，apply是传入带下标的集合，数组或者类数组，apply把它传给函数作为参数，call从第二个开始传入的参数是不固定的，都会传给函数作为参数。
call比apply的性能要好，平常可以多用call, call传入参数的格式正是内部所需要的格式，

#### 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片

1. 能够完成整个http请求
2. 跨域友好
3. 触发 GET 请求之后不需要获取和处理数据、服务器也不需要发送数据
4. 执行过程无阻塞
5. 相对于 XHR 性能更好
6. 最小合法体积

#### 实现 (5).add(3).minus(2) 功能

```
Number.prototype.add = function(num) {
    return this + num
}
Number.prototype.minus = function(num) {
    return this -  num
}
```

#### Vue 的响应式原理中 Object.defineProperty 有什么缺陷

1. Object.defineProperty无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
2. Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。
3. Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。

#### 怎么让一个 div 水平垂直居中

```
    //给父元素添加样式
    display: flex;
    justify-content: center;
    align-items: center;
    //绝对定位不定宽高
    body {
    height: 100vh;
    width: 100%;
    position: relative;
}
div {
    height: 50px;
    width: 50px;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
}
// 绝对定位定宽高
body {
    height: 100vh;
    width: 100%;
    position: relative;
}
div {
    height: 50px;
    width: 50px;
    background-color: red;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left：-25px;
    margin-top: -25px;
}
```

#### 输出以下代码的执行结果并解释为什么

```
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)

// undifined
// {n:2}
```
[详情请见](https://juejin.im/post/5b605473e51d45191a0d81d8)
