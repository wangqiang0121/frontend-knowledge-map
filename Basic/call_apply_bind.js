/**
 * call、apply、bind
 *
 * call和apply 改变了函数的this上下文之后便立即执行函数，bind则是返回改变了上下文后的一个函数。
 * 也就是 call 和 apply 立即执行，bind不立即执行。
 *
 * call和apply基本类似，但是他们立即传入的参数不一样
 * call方法接收的时若干个参数列表，apply接收的时一个包含多个的参数的数组
 *
 * https://juejin.im/post/6844904126996807688
 */

// example
var arr = [34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687];
//apply接收数组
Math.max.apply(Math, arr);
//call接收若干个参数
Math.max.call(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687);
//bind不会立即执行  要加上()去执行函数
Math.max.bind(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687)();

/* call(context, args), 改变函数this执行，立即执行  */
Function.prototype.myCall = function (context) {
  //如果没有参数context指向得是window
  context = context || window;
  //传输obj的对象上添加调用的方法，这里this得指向是max
  context.fn = this;
  //处理参数 去除第一个参数this 其它传入fn函数
  let arg = [...arguments].slice(1);
  //执行fn
  let result = context.fn(...arg);
  //删除fn
  delete context.fn;
  //返回执行结果
  return result;
};
console.log(Math.max.myCall(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687)); //687

Function.prototype.myApply = function (context) {
  //如果没有参数context指向得是window
  context = context || window;
  //传输obj的对象上添加调用的方法，这里this得指向是max
  context.fn = this;
  let result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};

console.log(
  Math.max.myApply(Math, [34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687])
); //687

/**
 * bind(context, args), 返回一个函数
 *
 * 相关实现分析
 * https://github.com/mqyqingfeng/Blog/issues/12
 * https://www.jianshu.com/p/6958f99db769
 *
 * bind多次调用后的结果
 * https://juejin.im/post/6844904039390396430 */
Function.prototype.myBind = function (context) {
  var me = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var bound = function () {
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      // this instanceof bound 这一步为什么能判断是构造函数调用？详见下面代码拆解
      return me.apply(this instanceof bound ? this : context || this, finalArgs);
  }
  // 继承 原函数
  var F = function () {};
  F.prototype = this.prototype;
  bound.prototype = new F();
  return bound;
}
console.log(Math.max.myBind(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687)());

/* 先来一个简单的构造函数调用，看下内部 this 的判断 */
function Foo() {
  /**
   * 为什么 this instanceof Foo = true ？这点理解了，也就能解释上面的构造函数调用判断；
   * A instanceof B
   * 表示：判断 B.prototype(构造函数的原型) 是否出现在 A 的原型链上(A.__proto__[prototype].__proto__…………)
   * 很显然，通过结果显示 构造函数 Foo.prototype 出现在了 this 对象原型链上。那为什么 构造函数 Foo 会出现在 this 对象原型链上呢？
   * 我们来看 new 操作做了什么？
   *    - 创建一个对象
   *    - 将构造函数的 this 指向这个新对象
   *    - * 将新创建对象的__proto__属性指向构造函数的原型，确保新创建的对象可以访问其构造函数原型上的属性。
   *
   * 可以解释为：this.__proto__ = Foo.prototype
   * 这样可以解释 Foo.prototype(构造函数的原型) 必然 出现在 this 对象的原型链上
   * 所以：this instanceof Foo = true
   * 所以上面的 bind 方法实现中利用这一点判断当前的函数调用方式是 构造函数式 还是 普通调用
   */
  console.log(this instanceof Foo);
  this.bar = "Lucas"
}
const instance = new Foo()
console.log(instance instanceof Foo)