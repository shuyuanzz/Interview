//原型继承
function Shu() {

}
Shu.prototype.sayHello = function () {
    console.log('hello')
}
function Yuam () {

}
yuan.prototype = new Shu();

//构造函数继承
 function Shu(name,age) {
     this.name = name;
     this.age = age;
 }
 function Yuan() {
     Shu.call(this,'shu',12);
 }

 //原型继承加构造函数继承

 function Shu(name,age) {
     this.name = name;
     this.age = age;
 }
 shu.prototype.sayHello = () => {
     console.log('hello',name,age);
 }
 function Yuan () {
     Shu.call(this,'shu','yuan');
 }
 Yuan.prototype = new Shu();
//原型继承加构造函数继承优化(寄生试组合继承)
 
 function Shu(name,age) {
    this.name = name;
    this.age = age;
}
shu.prototype.sayHello = () => {
    console.log('hello',name,age);
}
function Yuan (a) {
    Shu.call(this,'shu','yuan');
    this.a = a
}
Yuan.prototype = new Shu();
Yuan.prototype.constructor = Yuan;

//类继承
class a {
    a = 1;
    constructor(age,name) {
        this.name = name;
        this.age = age;
    }
    shu() { return 1}
}
class b extends a {
    constructor(age,name) {
        super(age,name);
    }
}