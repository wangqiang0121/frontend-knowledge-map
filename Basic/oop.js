/**
 * 类与面向对象编程 Note
 * https://www.ituring.com.cn/book/tupubarticle/32494
 *
 * 从创建对象开始看。虽然使用Object构造函数或字面量可以方便地创建对象，但这些方式也有明显不足：创建具有同样接口的多个对象需要重复编写很多代码。
 *
 * 于是，我们要解决的问题便是，如何快速创建具有同样接口的多个对象。
 */

//  8.2.2 工厂模式
console.log('------- 8.2.2 工厂模式 -------')
function createPerson(name, age, job) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  }
  return o;
}
let person1 = createPerson('Nicholas', 29, "Software Engineer");
let person2 = createPerson('Grege', 27, "Doctor");
console.log(person1);
console.log(person2);
console.log(person1.constructor);
// 解决了创建多个类似对象的问题，但是没有解决对象类型的问题；

// 8.2.3 构造函数模式
console.log('------- 8.2.3 构造函数模式 -------')
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  }
}
let person3 = new Person('Nicholas', 29, "Software Engineer");
let person4 = new Person('Grege', 27, "Doctor");
console.log(person3);
console.log(person4);
console.log(person3.constructor);
console.log(person3 instanceof Person);
console.log(person3 instanceof Object);
// 解决了创建问题；解决了类型问题；但是对象内的函数在每次创建时重新生成，是两个完全不同的实例。但希望达成继承的效果，需要两个对象公用一处对象实例。
// 可以将 sayName 方法，提取出来，作为公共方法
function sayName () {
  console.log(this.name);
}
// 但这样做污染了全局作用域。

// 继续 => oop_prototype.js