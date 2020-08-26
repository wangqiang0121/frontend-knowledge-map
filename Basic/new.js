/**
 * JavaScript 原生 new 运算符的功能
 */
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
// new 支持构造函数及初始化参数
const car1 = new Car('Eagle', 'Talon TSi', 1993);

console.log(car1.make);

/* 实现一个 类似new操作的函数，支持传入构造函数及初始化参数 */
function create() {
	// 创建一个空的对象
	let obj = new Object()
	// 利用数组的shift获得第一个参数即构造函数，因为shift会对arguments直接操作，所以剩下的参数就是初始化参数。
  let Con = [].shift.call(arguments)
	// 将新创建对象的__proto__属性指向构造函数的原型，确保新创建的对象可以访问其构造函数原型上的属性。
	obj.__proto__ = Con.prototype
	// 构造函数的this绑定到新创建的对象上，并执行生成一个新的对象
	let result = Con.apply(obj, arguments)
	// 确保最终返回的是一个对象
	return typeof result === 'object' ? result : obj
}

const car2 = create(Car, 'Eagle', 'Talon TSi', 1993);
console.log(car2.model);
