/* ****************************************************************************************************
 *                                    子类.prototype = new 父类()
 ************************************************************************************************* */

// 1. 定义超类型
const SuperType = function () {};
SuperType.prototype.sayHello = function () {
  console.log("hello");
};

// 2. 定义子类型
const SubType = function () {};
SubType.prototype = new SuperType();

// 3. 创建子类型的实例
const person = new SubType();

console.log(SuperType.prototype === SubType.prototype);
/** 🔵 测试 */

// 1. 子类实例拥有超类型的方法
person.sayHello(); // hello

// 2. "超类型的prototye" 在 “子类实例” 的原型链上
console.log(SuperType.prototype.isPrototypeOf(person)); // true
console.log(person.__proto__ === SubType.prototype); // true

// 3. 子类型的prototye在实例的原型链上
console.log(SubType.prototype.isPrototypeOf(person)); // true

/** 🔴 存在的问题 */

// 1. “引用类型值的原型属性” 会被所有实例共享；
SuperType.prototype.likes = ["biking", "coding"];
const person1 = new SubType();
const person2 = new SubType();
person1.likes.push("reading");
console.log(person1.likes); // ["biking", "coding", "reading"]
console.log(person2.likes); // ["biking", "coding", "reading"]

// 2. 子类型无法向父类型构造函数传参；
// (略)
