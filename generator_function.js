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

function* generator(i){
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
function* logGenerator() {
  console.log(yield);//首次执行的中断处
  console.log(yield);
  console.log(yield);
}

var gen = logGenerator();

// 首次调用 next() 会执行到第一个 yield 语句处
gen.next();
/* 调用 next() 方法时，如果传入了参数，那么这个参数会取代生成器函数中对应执行位置的 yield 表达式（整个表达式被这个值替换） */
gen.next('pretzel'); // pretzel
gen.next('california'); // california
gen.next('mayonnaise'); // mayonnaise

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