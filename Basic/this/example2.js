/* 上下文对象中调用this */

const student = {
  name: 'Lucas',
  fn: function() {
      return this
  }
}

console.log(student.fn() === student)


const person = {
  name: 'Lucas',
  brother: {
      name: 'Mike',
      fn: function() {
          return this.name
      }
  }
}
console.log(person.brother.fn())
// this指向最后调用它的对象

const o1 = {
  text: 'o1',
  fn: function() {
      return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: function() {
      return o1.fn()
  }
}
const o3 = {
  text: 'o3',
  fn: function() {
      var fn = o1.fn
      return fn()
  }
}

console.log(o1.fn())
console.log(o2.fn())
// 在 o2.fn() 中，最终还是调用 o1.fn(), 所以输出的是o1
console.log(o3.fn())
// 进行 var fn = o1.fn 赋值之后，并没有明确的调用上下文，所以this指向window，输出undefined