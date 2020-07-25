
/**
 * 节流(throttle): 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。
 * @param {function} fun 要执行的函数
 * @param {number} wait 多久执行一次
 * @param {number} immediate 第一次调用是否立即执行
 */
function throttle(fun, wait, immediate) {
  let timer = null;

  return function() {
    let context = this;
    let args = arguments;

    if (immediate) {
      fn.apply(fn, args);
      immediate = false;
    }

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  }
};


/**
 * 防抖 (debounce): 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
 * @param {function} fun 要执行的函数
 * @param {number} wait 多久执行一次
 * @param {number} immediate 第一次调用是否立即执行
 */

function debounce(fn, wait, immediate) {
  let timer = null;

  return function() {
    let args = arguments;
    let context = this;

    if (immediate && !timer) {
      fn.apply(context, args);
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  }
}


/**
 * 总结
 * 节流：定时器按照固定频率执行
 * 防抖：定时器直到函数不再调用，再执行
 */
