/**
 * @题目描述
 *
 * 算法工程师小明面对着这样一个问题。需要将通信用的信道分配给尽量多的用户，信道的条件及分配规则如下:
 * 1. 所有信道都有属性:”阶”。阶为r的信道的容量为2^r比特
 * 2. 所有用户需要传输的数据量都一样:D比特
 * 3. 一个用户可以分配多个信道，但每个信道只能分配给一个用户
 * 4. 只有当分配给一个用户的所有信道的容量和>=D，用户才能传输数据
 *
 * 给出一组信道资源，最多可以为多少用户传输数据?
 *
 * @输入描述
 * 第一行，一个数字R。R为最大阶数。0<=R<20
 * 第二行，R+1个数字，用空格隔开。代表每种信道的数量Ni。按照阶的值从小到大排列。0<=i<=R,0<=Ni<1000
 * 第三行，一个数字D。D为单个用户需要传输的数据量。
 * 0<D<1000000
 *
 * @输出描述
 * 一个数字,代表最多可以供多少用户传输数据。
 *
 */

/**
 * x << y, 表示x * 2的y次方
 * 这个操作是位运算中的左移操作符，表示将x的二进制表示向左移动y位
 */

/**
 * 表示：[10, 5, 0, 1, 3, 2]
 * 2**0，有10个
 * 2**1，有5个
 * 2**2，有0个
 * 2**3，有3个
 * 2**4，有2个
 */

function maxUsers(arr, D) {
  // 需要组合使用的信道（在JS中，可以使用数组模拟multiset的功能）
  let mset = [];
  // 可以单独使用的信道数量
  let count = 0;
  arr.forEach((channelCount, j) => {
    const capacity = 2 ** j;

    // a.可以独立使用的信道
    if (capacity >= D) {
      count += channelCount;
      return;
    }

    // b.对于较小的信道
    for (let k = 0; k < channelCount; k++) {
      mset.push(2 ** j);
    }
  });

  // 对需要组合使用信道，升序排列
  mset.sort((a, b) => a - b);

  let object = D;
  // 把之前积累的小的信道组装起来，看能满足几个用户传输数据
  while (object > 0 && mset.length) {
    // 消耗使用掉
    const lastChannel = mset.pop();
    object -= lastChannel; // 使用数组的最后一个元素（最大值）来减少object

    // 完成一个传输，则count++ && 重置任务
    if (object <= 0) {
      // 如果object减到0或以下，说明成功为一个用户提供服务
      count++;
      object = D; // 重置object为下一个用户的需求
    }
  }

  return count;
}

console.log(maxUsers([10, 5, 0, 1, 3, 2], 30) === 4);

// 测试用例1: 所有信道容量都大于用户需求，且有多种信道
console.log(maxUsers([5, 2, 4, 3], 1) === 14); // 应输出14

// 测试用例2: 只有高阶信道的容量足以单独满足用户需求
console.log(maxUsers([0, 0, 0, 1, 2], 8) === 3); // 应输出3

// 测试用例3: 需要组合不同阶的信道来满足用户需求
console.log(maxUsers([3, 2, 1], 3) === 3); // 应输出3

// 测试用例4: 所有信道的容量加起来也无法满足任何用户的需求
console.log(maxUsers([2, 1], 5) === 0); // 应输出0，因为即使合并所有信道也无法满足单个用户需求

// 测试用例5: 只有一种信道，且其容量刚好等于用户需求
console.log(maxUsers([0, 4], 2) === 4); // 应输出4

// 测试用例6: 复杂场景，需要精确计算不同阶信道的组合
console.log(maxUsers([10, 5, 0, 1, 3, 2], 30) === 4); // 已给出的示例，应输出4
