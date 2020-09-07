// async function a1 () {
//   console.log('a1 start')
//   await a2()
//   console.log('a1 end')
// }
// async function a2 () {
//   console.log('a2')
// }

console.log('script start')

// 宏任务
setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
  // 微任务
  console.log('promise1')
})

// a1()
// 转换成promise形式
new Promise((reslove, reject) => {
  console.log('a1 start') // 同步任务
  new Promise((resolve, reject) => {
    console.log('a2') // 同步任务
    reslove();
  }).then(() => {
    console.log('a1 end');  // 微任务
  })
})

let promise2 = new Promise((resolve) => {
  resolve('promise2.then')
  console.log('promise2') // 同步任务
})

promise2.then((res) => {
  // 微任务
  console.log(res)
  Promise.resolve().then(() => {
    console.log('promise3')
  })
})
console.log('script end')

// note: 浏览器中执行和控制台中执行结果不一样