# Interview
前端面试总结
### <a href="# js部分"></a>
### <a name="js部分"></a>
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

2) instance of:  （用来检测引用类型）
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