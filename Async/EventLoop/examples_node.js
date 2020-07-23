/** 以下为 Node 中的 EventLoop 内容 */

/**
 * Example 6
 */
console.log('golb1');

setTimeout(function () {
  console.log('timeout1');
  process.nextTick(function () {
    console.log('timeout1_nextTick');
  })
  new Promise(function (resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function () {
    console.log('timeout1_then')
  })
})

setImmediate(function () {
  console.log('immediate1');
  process.nextTick(function () {
    console.log('immediate1_nextTick');
  })
  new Promise(function (resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function () {
    console.log('immediate1_then')
  })
})

process.nextTick(function () {
  console.log('glob1_nextTick');
})

new Promise(function (resolve) {
  console.log('glob1_promise');
  resolve();
}).then(function () {
  console.log('glob1_then')
})

// 宏任务3
setTimeout(function () {
  console.log('timeout2');
  process.nextTick(function () {
    console.log('timeout2_nextTick');
  })
  new Promise(function (resolve) {
    console.log('timeout2_promise');
    resolve();
  }).then(function () {
    console.log('timeout2_then')
  })
})

process.nextTick(function () {
  console.log('glob2_nextTick');
})

new Promise(function (resolve) {
  console.log('glob2_promise');
  resolve();
}).then(function () {
  console.log('glob2_then')
})

// 宏任务4
setImmediate(function () {
  console.log('immediate2');
  process.nextTick(function () {
    console.log('immediate2_nextTick');
  })
  new Promise(function (resolve) {
    console.log('immediate2_promise');
    resolve();
  }).then(function () {
    console.log('immediate2_then')
  })
})

/**
 * Example 7
 *
node event-loop.js

beginning of the program

I am in the promise function!

I am in the process next tick now

I am in the first resolved promise

I am in the second resolved promise

I am in the callback from setTimeout with 0ms delay

I am from setImmediate callback

==================

I am from setImmediate callback

I am in the callback from setTimeout with 0ms delay

*/

/*
beginning of the program

*/
const fs = require('fs');

console.log('beginning of the program');

const promise = new Promise(resolve => {
  // function, passed to the Promise constructor
  // is executed synchronously!
  console.log('I am in the promise function!');
  resolve('resolved message');
});

promise.then(() => {
  console.log('I am in the first resolved promise');
}).then(() => {
  console.log('I am in the second resolved promise');
});

process.nextTick(() => {
  console.log('I am in the process next tick now');
});

fs.readFile('index.html', () => {
  console.log('==================');
  setTimeout(() => {
    console.log('I am in the callback from setTimeout with 0ms delay');
  }, 0);

  setImmediate(() => {
    console.log('I am from setImmediate callback');
  });
});

setTimeout(() => {
  console.log('I am in the callback from setTimeout with 0ms delay');
}, 0);

setImmediate(() => {
  console.log('I am from setImmediate callback');
});
