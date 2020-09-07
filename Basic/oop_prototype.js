
/**
 * 理解原型
 *
 * 函数的prototype属性（原型对象），会自动获得一个constructor属性，指回构造函数。
 * 构造函数通过new关键词，将实例与构造函数的prototype属性关联起来，从而获得constructor属性，标识了对象类型
 * 但是构造函数的prototype上并没有定义内容，所以每个实例内的属性方法仍然是独立的。
 *
 * 构造函数、原型对象和实例
 *
 * 实例通过__proto__链接到原型对象
 * 构造函数通过prototype属性链接到原型对象
 * 实例与构造函数没有直接联系，与原型对象有直接联系
 */

// 8.2.4 原型模式
console.log('------- 8.2.4 原型模式 -------')
function Person() {}

Person.prototype = {
  constructor: Person,
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  friends: ["Shelby", "Court"],
  sayName() {
    console.log(this.name);
  }
};

let person1 = new Person();
let person2 = new Person();

person1.friends.push("Van");

console.log(person1.friends);  // "Shelby,Court,Van"
console.log(person2.friends);  // "Shelby,Court,Van"
console.log(person1.friends === person2.friends);  // true

// 原型上的属性在实例间共享，会在包含引用值时出现问题。