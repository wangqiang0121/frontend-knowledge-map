/* 1. 全局环境下的this */
function f1() {
  console.log(this);
}

function f2() {
  'use strict'
  console.log(this);
}
f1();
f2();
// 函数在浏览器全局环境中被调用，非严格模式下this指向window；在'use strict'严格模式下，指向undefined；

/* 1.1 变形 */
const foo = {
  bar: 10,
  fn: function() {
    console.log(this)
    console.log(this.bar)
  }
}
var fn1 = foo.fn
fn1()
// 虽然 fn 函数在 foo 对象中作为方法被引用，但是在赋值给 fn1 之后，fn1 的执行仍然是在 window 的全局环境中。因此输出 window 和 undefined。

/* 1.2 变形 */
foo.fn();
// 这个时候 this 指向的是最后调用它的对象，在 foo.fn() 语句中 this 指向 foo 对象。

/**
 * 总结
 * 在执行函数时，如果函数中的 this 是被上一级的对象所调用，那么 this 指向的就是上一级的对象；否则指向全局环境。
 */