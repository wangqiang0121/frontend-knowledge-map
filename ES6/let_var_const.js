/**
 * let, var, const 的区别
 * let, const 是es6的新语法
 * var 是es5声明变量的方式
 *
 * let, const 块级作用域、不存在变量提升、暂时性死区、不允许重复声明
 * const: 声明常量，无法修改
 *
 * 暂时性死区怎么解释？
 * 因为let，const是块级作用域，在变量声明前使用变量，会报出 RefrenceError
 *
 * var 会进行变量提升
 *
 * 变量提升的规则是？
 * JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。
 * JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。
 *
 */

// 为什么要有块级作用域的原因？因为不合理。

// 示例 1：var 存在变量提升，导致 tmp 输出为 undefined。
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    console.log('if false')
    var tmp = 'hello world';
  }
}

/*

var 会进行变量提升

function f() {
  var temp = undefined;
  console.log(tmp);
  if (false) {
    console.log('if false')
    tmp = 'hello world';
  }
}
*/



f(); // undefined

// 示例 2：下面代码中，变量 i 只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
