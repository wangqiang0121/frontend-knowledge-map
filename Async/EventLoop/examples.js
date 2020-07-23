/*
  [前端基础进阶（十二）：深入核心，详解事件循环机制](https://www.jianshu.com/p/12b9f73c5a4f)
  这篇文章里面提到的分析方法非常有用。
*/

/**
 * Example 1
 * result: 输出顺序a,b,c
 * why: Promise的resolve始终都是异步操作
 */
var r = new Promise(function (reslove, reject) {
  console.log('a') // 构造函数直接执行
  reslove() // 进入微任务队列
});

r.then(() => console.log('c'))

console.log('b') // 宏任务

/**
 * Example 2
 * result: 输出顺序a,b,c,d
 * why: Promise产生的是JavaScript引擎内部的微任务，而setTimeout是浏览器API，它产生宏任务
 */
var r = new Promise(function (reslove, reject) {
  console.log('a')
  reslove()
});
// 宏任务
setTimeout(() => {
  console.log('d')
}, 0);
// 微任务
r.then(() => console.log('c'))
console.log('b')


/**
 * Example 3
 * result: 输出顺序c1,c2,d
 * why: 微任务优先
 */
// 宏任务
setTimeout(() => console.log("d"), 0)
var r1 = new Promise(function (resolve, reject) {
  resolve()
});
r1.then(() => {
  // 微任务
  var begin = Date.now();
  while (Date.now() - begin < 1000);
  console.log("c1")
  new Promise(function (resolve, reject) {
    // 微任务
    resolve()
  }).then(() => console.log("c2"))
});

/**
 * Example 4
 * result: a,b,c
 * why: 微任务优先
 */
function sleep(duration) {
  return new Promise(function (resolve, reject) {
    // 宏任务
    console.log("b");
    // 宏任务
    setTimeout(resolve, duration);
  })
}
// 宏任务
console.log("a");
// 微任务
sleep(5000).then(() => console.log("c"));


/**
 * Example 5
 * result: 2，3，5，4，1
 * why: 微任务优先
 */
// 宏任务
setTimeout(function () {
  console.log(1)
}, 0);

new Promise(function executor(resolve) {
  // 直接执行
  console.log(2);
  // 直接执行
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve(); // 微任务
  }
  // 直接执行
  console.log(3);
}).then(function () {
  // 微任务
  console.log(4);
});
// 宏任务
console.log(5);

