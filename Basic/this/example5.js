/* 箭头函数中的 this 指向 */
const foo = {
  fn: function () {
      // setTimeout(function() {
      //     console.log(this)
      // })
      setTimeout(() => {
        console.log(this)
    })
  }
}
console.log(foo.fn())
// setTimout执行的上下文是window对象，所以this指向window

/**
 * 结论：
 * 箭头函数使用 this 是根据外层（函数或者全局）上下文来决定。 */