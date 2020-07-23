/**
 * const promise = new Promise((reslove, reject) => {});
 * Promise 将异步操作封装成一个promise实例
 *
 * promise 有三种状态
 * 内部的异步操作，在成功时执行resolve, 失败时执行reject
 * 对应的promise实例状态发生变化
 * promise实例有两个方法，then和catch
 */

/**
 * 实现一个简易版的promise(难)
 *
 * 1、实现一个Promise构造函数
 * 1.1、实例接受一个回调函数，回调函数的参数是（reslove, reject）;分别在操作成功和失败时调用；
 * 1.2、要将promise实例的then和catch方法，保存下来，以便在resolve和reject时调用；
 *
 * 2、构造函数的原型上添加实例方法，then和catch
 * 2.1
 */
const PENDING = 'pending';
const RESOLVED = 'resloved';
const REJECTED = 'rejcted';

function MyPromise(fn) {
  const that = this;
  that.state = PENDING
  that.value = null;
  // 用于保存then和catch内的回调，因为在等待状态中，应该讲后续回调存下来，待结束后调用。
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  // fn 执行完成回调
  function reslove(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED;
      that.value = value;
      that.resolvedCallbacks.map(cb => cb(that.value));
    }
  }
  // fn 执行失败回调
  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.value = value;
      that.rejectedCallbacks.map(cb => cb(that.value));
    }
  }

  // 执行
  try {
    fn(reslove, reject);
  } catch (e) {
    reject(e);
  }
}
// ????
MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this;
  // ???
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled: v => v
  // ???
  onRejected = typeof onRejected === 'function' ? onRejected: r => { throw r }

  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }

  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}

new MyPromise((reslove, reject) => {
  setTimeout(() => {
    reslove(1);
  }, 1000);
}).then(() => {
  setTimeout(() => {
    reslove(1);
  }, 2000);
}).then(value => {
  console.log(value);
})
