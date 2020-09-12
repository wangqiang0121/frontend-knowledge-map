/* 构造函数和 this */
function Foo() {
  this.bar = "Lucas"
}
// new 操作符调用构造函数，具体做了什么？
const instance = new Foo()
console.log(instance.bar)