/**
 * 参考：
 * 适合初学者的JavaScript面向对象
 * https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object-oriented_JS
 *
 * 类的概念（属性、方法、构造函数）
 * JavaScript 利用构造函数来定义对象及他们的特征，构造函数创建的实例，并非完全复制，而是通过原型链实现的。
 * new 的概念、实现 => 改变this指向，定义原型
 *
 * 类的继承
*/

/* 类的声明 */

// es5
var Animal = function () {
  this.name = "Animal";
};

// es6
class Animal2 {
  constructor() {
    // super() 调用父类的构造函数
    this.name = "Animal2";
  }
}

/**
 * 类的实例化
 * new是什么？new做了什么？ */
console.log(new Animal(), new Animal2());


/** 类的继承 */
