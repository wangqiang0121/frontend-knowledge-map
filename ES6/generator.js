/**
 * Generator
 * 阿里框架内DVA的语法主要就是Generator
 *
 * 1、Generator 函数返回一个迭代器，函数内部通过 yield 中断。
 *    通过返回的迭代器，执行 next 方法，顺序的执行中断内容。
 * 2、next 方法传入的参数，是上一个 yield 表达式的值
 * 3、Generator 可以通过yield直接显示的返回内容
 * 4、Generator 函数不能作为构造函数
 */

// 简单示例
function* idMaker(){
  var index = 0;
  while(index<3)
    yield index++;
}

// 返回一个iterator对象
var gen = idMaker();

// iterator.next() 会执行到下次 yield
/*
  iterator.next()
  返回一个对象 {value, done}
  value 表示本次 yield 执行结果
  done 表示是否是最后一次执行
*/

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next()); // {value: 2, done: false}
console.log(gen.next()); // {value: undefined, done: true}

// yield*的示例
function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  /*  等价于在其中添加如下代码：
      yield i + 1;
      yield i + 2;
      yield i + 3;
  */
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20

// 传递参数
function *foo(x) {
  let y = 2 * (yield (x + 1));
  let z = yield(y/3);
  return (x + y + z);
}

let it = foo(5);
console.log(it.next());
/**
 * it.next(12)
 * 传入的值，等于上一个 yield 的返回值
 * 所以 y = 2 * 12 = 24; z = 24 / 3 = 8;
 */
console.log(it.next(12));
console.log(it.next(13));

// 显示返回
function* yieldAndReturn() {
  yield "Y";
  return "R";//显式返回处
  yield "unreachable";
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }

// 生成器函数不能当构造器使用
function* f() {}
var obj = new f; // throws "TypeError: f is not a constructor"
