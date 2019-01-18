/*
  The Best Explanation of JavaScript Reactivity
  (https://medium.com/vue-mastery/the-best-explanation-of-javascript-reactivity-fea6112dd80d)
*/

let data = { price: 5, quantity: 2 }
let target = null

class Dep {
  constructor () {
    this.subscribers = []
  }

  depend () {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target)
    }
  }
  notify () {
    this.subscribers.forEach(sub => sub())
  }
}

Object.keys(data).forEach(key => {
  let internalValue = data[key]

  const dep = new Dep()

  Object.defineProperty(data, key, {
    get () {
      dep.depend()
      return internalValue
    },
    set (newVal) {
      internalValue = newVal
      dep.notify()
    }
  })
})

function watcher(func) {
  target = func
  target()
  target = null
}

watcher(() => {
  data.total = data.price * data.quantity
})