/* example 1 */
const foo1 = (function() {
  var v = 0
  return () => {
      return v++
  }
}())
// foo 是一个立即函数，返回一个函数，执行v++;

for (let i = 0; i < 10; i++) {
  foo1()
}

console.log(foo1()) // 10

/* example 2 */
const foo2 = () => {
  var arr = []
  var i

  for (i = 0; i < 10; i++) {
      arr[i] = function () {
          console.log(i)
      }
  }

  return arr[0]
}

foo2()() // 10

/* example 3 */
var fn = null
const foo3 = () => {
    var a = 2
    function innerFoo() {
        console.log(a)
    }
    fn = innerFoo
}

const bar = () => {
    fn()
}

foo3()
bar() // 2

/* example 4 */
var fn = null
const foo4 = () => {
    var a = 2
    function innerFoo() {
        console.log(c)
        console.log(a)
    }
    fn = innerFoo
}

const bar = () => {
    var c = 100
    fn()
}

foo4()
bar() // 报错
/**
 * 在 bar 中执行 fn() 时，fn() 已经被复制为 innerFoo，
 * 变量 c 并不在其作用域链上，
 * c 只是 bar 函数的内部变量。
 * 因此报错 ReferenceError: c is not defined。
 */