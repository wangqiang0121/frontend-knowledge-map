// 简单例子
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function add1(x) {
  var a = resolveAfter2Seconds(20);
  var b = resolveAfter2Seconds(30);
  return x + await a + await b;
}

add1(10).then(v => {
  console.log(v);  // prints 60 after 2 seconds.
});

async function add2(x) {
  var a = await resolveAfter2Seconds(20);
  var b = await resolveAfter2Seconds(30);
  return x + a + b;
}

add2(10).then(v => {
  console.log(v);  // prints 60 after 4 seconds.
});

// 通过async方法重写 promise 链
// 返回 Promise的 API 将会被用于 promise 链，它会将函数分成若干部分。例如下面代码：
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function

function getProcessedData(url) {
  return downloadData(url) // returns a promise
    .catch(e => {
      return downloadFallbackData(url)  // returns a promise
        .then(v => {
          return processDataInWorker(v); // returns a promise
        });
    })
    .then(v => {
      return processDataInWorker(v); // returns a promise
    });
}
// 可以通过如下所示的一个async函数重写：

async function getProcessedData(url) {
  let v:
  try {
    v = await downloadData(url);
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
// 注意，在上述示例中，return 语句中没有 await 操作符，因为 async function 的返回值将隐式传递给 Promise.resolve。