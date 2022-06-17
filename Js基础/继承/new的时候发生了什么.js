/**
 * # new的原理
 */

function _new(constructor, ...args) {
  // 1. 创建一个新对象
  const target = {};

  // 2. 新对象的 __proto__ 指向构造函数的 prototype
  target.__proto__ = constructor.prototype;

  // 3. 在新对象上执行构造函数
  const result = constructor.apply(target, args);

  //4. 返回，若函数未返回其他对象，那么new表达式中的函数调用会自动返回这个新对象；
  return result instanceof Object ? result : target;
}

function Person(name) {
  this.name = name;
}

const a = new Person("小花");
console.log(a.name);
console.log(a instanceof Person);

const b = _new(Person, "小草");
console.log(b.name);
console.log(b instanceof Person);
