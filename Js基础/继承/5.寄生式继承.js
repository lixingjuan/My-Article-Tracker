/* ****************************************************************************************************
 * 寄生式继承，接近原型继承
 *
 * 实现，类似于工厂函数：
 *  1. 在工厂函数内部使用 Object.create, 创建其他超类的实例，
 *  2. 然后在该实例基础上，增加一些方法
 *
 ************************************************************************************************* */

const person = {
  name: "Tom",
  friends: ["Herry", "Merry"],
};

/** 🟡 */
function createAnother(original) {
  // 🟡 原型继承
  const clone = Object.create(original);

  // 🟡 对新对象增强
  clone.sayHi = function () {
    console.log("hi");
  };
  // 🟡 返回新对象
  return clone;
}
/** 🟡 */

// 这里得到的 `instance1` 和 `instance2` ，即是对person进行浅拷贝，并且自定义了一些方法后的一个对象，与person相比，多了自定的方法而已
const instance1 = createAnother(person);
const instance2 = createAnother(person);

/** 🔵 测试 🔵 */
console.log(instance1.friends === instance2.friends); // true
