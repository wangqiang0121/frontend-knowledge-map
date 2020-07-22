/**
 * 手动编写一个 Promise.all 函数
 * 入参是一个promise数组，但也可能数组中混入非promise类型，需要包裹一下；
 * 返回是一个promise结果，结果的值是一个与传入序列相同的结果值，当所有promise都返回时，执行整体返回
 */
function promiseAll(promises) {
  return new Promise((reslove, reject) => {
    if (!(promises instanceof Array)) {
      throw new Error('参数类型应该为数组');
    }

    const results = new Array(promises.length);
    let resloverLength = 0;

    promises.forEach((promise, index) => {
      Promise.reslove(promise).then((result) => {
        resloverLength++;
        results[index] = result;

        if (resloverLength === promises.length) {
          reslove(results)
        }
      }).catch(reject)
    })
  })
}
