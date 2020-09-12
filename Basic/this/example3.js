/**
 * bind/call/apply 改变 this 指向 */

//  bind/call/apply的区别

const target = {};
fn.call(target, 'arg1', 'arg2');
fn.apply(target, ['arg1', 'arg2']);
fn.bind(target, 'arg1', 'arg2')();
// 上面这三种使用方式实现效果是等价的


const foo = {
  name: 'lucas',
  logName: function() {
      console.log(this.name)
  }
}
const bar = {
  name: 'mike'
}
console.log(foo.logName.call(bar))
// 通过显示绑定的方式，将foo.logName方法的this绑定到bar上。