/**
 * instanceof
 * 能在实例的 原型对象链 中找到该构造函数的 prototype 属性所指向的 原型对象，就返回 true */

function new_instance_of(leftVaule, rightVaule) {
  let rightProto = rightVaule.prototype; // 取右表达式的 prototype（原型） 值
  leftVaule = leftVaule.__proto__; // 取左表达式的 __proto__（执行其原型）值
  while (true) {
    if (leftVaule === null) {
          return false;
      }
      if (leftVaule === rightProto) {
          return true;
      }
      // 因为 __proto__ 指向原型，原型也是个对象，所以原型的 __proto__ 继续指向他的原型，形成原型链。
      leftVaule = leftVaule.__proto__
  }
}