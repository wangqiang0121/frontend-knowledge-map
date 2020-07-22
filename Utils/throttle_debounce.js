
/** * 简单的节流函数
 * @param {function} fun 要执行的函数
 * @param {number} delay 延迟时间
 * @param {number} time 在此范围内必须执行一次
 */
function throttle(fun, delay, time) {
  var timeout,
      startTime = new Date();

  return function() {
      var context = this,
          args = arguments,
          curTime = new Date();

      clearTimeout(timeout);
      // 如果达到了规定的触发时间间隔，触发 handler
      if (curTime - startTime >= time) {
          fun.apply(context, args);
          startTime = curTime;
          // 没达到触发间隔，重新设定定时器
      } else {
          timeout = setTimeout(fun, delay);
      }
  };
};