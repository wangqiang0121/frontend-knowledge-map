// 同步执行
console.log('script start')

/**
 * 下面三块内容转换成 promise 形式
 * new Promise((reslove, reject) => {
 *    console.log(async2 end); // 构造函数同步执行
 *    reslove(Promise.reslove()); // 微任务，先挂起
 * }).then(() => {
 *    console.log('async1 end')
 * })
 */
async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

// 宏任务
setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise') // 构造函数同步执行
  resolve() // 微任务
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
