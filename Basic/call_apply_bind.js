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
 * https://github.com/mqyqingfeng/Blog/issues/12
 * bind多次调用后的结果
 * https://juejin.im/post/6844904039390396430 */
Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fBound ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = self.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
console.log(Math.max.myBind(Math, 34, 5, 3, 6, 54, 6, -67, 5, 7, 6, -8, 687)());
