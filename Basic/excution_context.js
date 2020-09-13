/**
 * 作用域、执行上下文、作用域链
 */

function bar() {
  console.log("bar1");
}

var bar = function () {
  console.log("bar2");
};

bar(); // bar2
/**
 * 因为在预编译阶段变量 bar 进行声明，但是不会赋值
 * 函数 bar 则进行创建并提升。在代码执行时，变量 bar 才进行（表达式）赋值，值内容是函数体为 console.log('bar2') 的函数
 * 输出结果 bar2
 *
 * function bar() {} 去哪了？
 */

// foo(10);
// function foo(num) {
//   console.log(foo);
//   foo = num;
//   console.log(foo);
//   var foo;
// }
// console.log(foo);
// foo = 1;
// console.log(foo);

// 转换一下
function foo(num) {
  var foo = undefined;
  console.log(foo); // undefined
  foo = num;
  console.log(foo); // 10
}
foo(10);
console.log(foo); // 函数体
foo = 1; // 赋值给谁了？
console.log(foo);
