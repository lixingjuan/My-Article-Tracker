# 目录

## 第一部分:基础知识
1.  [ ] 面向对象的javascript
2.  [ ] this，call和apply
3.  [ ] 闭包和高阶函数

## 第二部分:设计模式
1.  [ ] 单例模式
2.  [ ] 策略模式
3.  [ ] 代理模式
4.  [ ] 迭代器模式
5.  [ ] 发布-订阅模式
6.  [ ] 命令模式
7.  [ ] 组合模式
8.  [ ] 模版方法模式
9.  [ ] 享元模式
10. [ ] 职责链模式
11. [ ] 中介者模式
12. [ ] 装饰者模式
13. [ ] 状态模式
14. [ ] 适配器模式


## 第三部分:设计原则和编程技巧
1.  [ ] 单一职责原则
2.  [ ] 最少知识原则
3.  [ ] 开放-封闭原则
4.  [ ] 接口和面向接口编程
5.  [ ] 代码重构




# 多态处理

1. 什么叫多态？
> 对不同的对象执行统一操作，分别得到不同的结果；比如，操作让动物们，“叫”，鸭子🦆会“嘎嘎嘎”，牛🐂会“哞哞哞”；这就是多态；
> 多态背后的思想是把 “做什么” 和 “谁去做怎么做” 分离开来， 即将 “不变的事物” 和 “可能改变的事物” 分离开
> 将不变的部分和变化的部分隔开是每个设计模式的主题；




1. 代码示例即如下

```js

const Duck = function(){}
const Cow = function(){}

const makeSound = function(animal) {
    if( animal instanceof Duck ){
        console.log( '嘎嘎嘎' );
    } else if( animal instanceof Cow ){
        console.log( '哞哞哞' );
    }
}


makeSound(new Duck())   // 嘎嘎嘎
makeSound(new Cow())    // 哞哞哞

```

以上代码确实满足了我们的需求，但是这种写法的话，缺点：
   1. 如果新来了一只动物，🐶，那我们就还要去改动 makeSound 函数才能让狗狗叫，如果动物越多，则代码越庞大；
   2. 频繁修改代码总是危险的；



首先我们把不变的部分隔离出来 => 所有的动物都会出叫声
然后把可变的部分各自封装起来
（多态实际上指的是对象的多态性）
改进后的代码

```js
const makeSound = function(aminal) {
  aminal.sound()
}

const Duck = function() {}
Duck.prototype.sound = function() {
  console.log('嘎嘎嘎')
}

const Cat = function() {}
Cat.prototype.sound = function() {
  console.log('喵喵喵')
}

makeSound(new Duck())
makeSound(new Cat())

```


# 常见的设计模式

1. 单例模式
2. 策略模式
3. 发布订阅者模式
4. 代理模式
5. 迭代器模式
6. 中介者模式
7. 享元模式
8. 职责链模式
9. 装饰着模式
10. 状态模式
11. 适配器模式
12. 组合模式
13. 模版方法模式
14. 命令模式








## 单例模式


> 单例模式的定义是：保证一个类仅有一个实例，并提供一个访问他的全剧访问点；

单例模式是一种常见的模式，有一些对象我们往往只需要一个，比如线程池、全剧缓存、浏览器中的window对象；


实现一个单例模式：
- 要实现一个简单单例模式，可以使用一个变量来标志当前是否已经为某个类创建过对象， 如果是，则在下一次获取该类的实例时，直接返回之前创建的对象；


```js
const Singleton = function(name) {
  this.name = name
  this.instance = null
}

Singleton.prototype.getName = function() {
  console.log(this.name)
}

Singleton.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new Singleton(name)
  }
  return this.instance
}

const a = Singleton.getInstance('cat')
const b = Singleton.getInstance('duck')

console.log(a) // Singleton { name: 'cat', instance: null }
console.log(b) // Singleton { name: 'cat', instance: null }

console.log(a === b) // true
```

该方法需要通过 `Singleton.getInstance` 来获取类 `Singleton` 类的唯一对象，该方法较为简单，但是增加了这个类的 “不透明性”；
使用该方法的人必须知道这是一个单例类，跟以往通过 `new XXX` 的方式来获取对象的方法不同；


接下来实现一个 “透明的单例类” 可以像使用其他普通类一样；


## 策略模式

> 策略模式的定义是，定义一系列的算法把他们一个个封装起来，并且是他们呢可以相互替换

实际开发中，解决一个问题我们常常有多种实现方案；比如去旅游，我们可以选择 飞机，开车，甚至是骑车；

举例：年终奖的计算

公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，
- 绩效为S的人年=> 年终奖有4倍工资；
- 绩效为A的人年终奖有3倍工资,
- 绩效为B的人年终奖是2倍工资。

转为代码即

```js
const calculateBonus = function(perforamnceLevel, salary) {
  if (perforamnceLevel === 'S') {
    return salary * 4
  }
  if (perforamnceLevel === 'A') {
    return salary * 3
  }
  if (perforamnceLevel === 'B') {
    return salary * 2
  }
}

calculateBonus('S', 2000) // 8000
calculateBonus('B', 1000) // 2000
```

然而, 以上代码有明显缺点：

1. calculateBonus函数比较庞大，包含了很多if-else 语句，这些语句需要覆盖所有的逻辑
分支；
2. calculateBonus函数缺乏弹性，如果增加了-种新的绩效等级C，或者想把绩效S的奖金
系数改为5, 那我们必须深入calculateBonus函数的内部实现，这是违反开放-封闭原则的；
3. 算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢?我们的选择
只有复制和粘贴。




### 初级解决方案


一般最容易想到的办法就是使用组合函数来重构代码, 把各种算法封装到一个个的小函
数里来提高代码复用性；

```js
var performanceS = function(salary) {
  return salary * 4
}

var performanceA = function(salary) {
  return salary * 3
}

var performanceB = function(salary) {
  return salary * 2
}

var calculateBonus = function(performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return performanceS(salary)
  }
  if (performanceLevel === 'A') {
    return performanceA(salary)
  }
  if (performanceLevel === 'B') {
    return performanceB(salary)
  }
}

calculateBonus('S', 2000) // 8000
calculateBonus('B', 1000) // 2000

```


但是仍然有一个重要问题 => calculateBonus函数有可能越来越庞大，而且在系统变化的时候缺乏弹性。




### 使用策略重构代码

> 策略模式指的是定义一系列的算法，把它们-一个个封装起来；
> 策略模式的目的就是将**算法的使用与算法的实现**分离开来；

在这个例子里，算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数额。而算法的实现是各异和变化的，每种绩效对应着不同的计算规则；
一个基于策略模式的程序至少由两部分组成。
- 第一个部分是一组策略类 ,策略类封装了具体的算法，并负责具体的计算过程；
- 第二个部分是环境类Context, Context 接受客户的请求，随后把请求委托给某-个策略类。要做到这点，说明Context中要维持对某个策略对象的引用。


**用策略模式来重构上面的代码**:


```js
/* 每种绩效的计算规则都封装在对应的策略类里面 */
const strategies = {
  S: function(salary) {
    return salary * 4
  },
  A: function(salary) {
    return salary * 3
  },
  B: function(salary) {
    return salary * 2
  }
}


const calculateBonus = function(level, salary) {
  return strategies[level](salary)
}


calculateBonus('S', 2000) // 8000
calculateBonus('B', 1000) // 2000

```


## 发布-订阅模式

实际场景：小明，小红，小花都想买房，他们三个互不认识，他们跑过去，可能房子还没发售，或者没有他们满意的户型；，
所以呢，小李房产公司就想个办法，做好房后在公众号上发布推送消息，
如果他们三个关注了小李房产公司的公众号，那么当小李推送了“房子发售啦”的消息后，所以订阅者就知道了，再过来买；

--- 这就是发布订阅者模式

发布订阅模式的实现步骤
1. 首先指定好谁是发布者；
2. 给发布者添加一个缓存队列，用来存放回调函数以便通知订阅者(爱吃烧饼名单)
3. 最后执行发布消息动作；

发布者可以在回调函数中填入一些参数，订阅者可以接收这些参数，比如房子单价、面积、户型等信息，订阅者接收到这些信息之后进行各自的处理；


```js
const salesoffices = {} // 小李房产公司公众号容器
salesoffices.clientList = [] // 存放订阅者的回调函数

// 小李房产公司被订阅
salesoffices.listen = function(fn) {
  this.clientList.push(fn) // 订阅的消息添加进缓存列表
}
// 小李房产公司发布消息
salesoffices.trigger = function() {
  for (var i = 0, fn; (fn = this.clientList[i++]); ) {
    fn.apply(this, arguments) // arguments 是发布消息时带上的参数
  }
}

/* 测试 */
// 小明订阅消息
salesoffices.listen(function(price, squareMeter) {
  console.log('价格' + price)
  console.log('squareMeter' + squareMeter)
})

// 小红订阅消息
salesoffices.listen(function(price, squareMeter) {
  console.log('价格' + price)
  console.log('squareMeter' + squareMeter)
})

// 发布消息
salesoffices.trigger(2000, 88)
salesoffices.trigger(3000, 40)

```


这就是一个简单的发布-订阅模式，但是存在以下问题：

1. 小明只想看 >100平 的房子； 小红只想看 <90平 的房子； 小花什么房都想看；但是小李房产公司会把所90平的房推送给小明，也会把130平的房推送给小红；这些多余的信息对于订阅者来说是干扰；

所以我们可以加一个标示 key, 此订阅者只订阅自己感兴趣的消息

```js

```



## 代理模式


# 设计原则和编程技巧

1. 单一职责
2. 最少知识原则
3. 开放封闭


4. 最少知识原则

5. 代码重构
   1. 少用三目运算符
   2. 合理使用链式调用: 不便于调试
   3.


# 参考文章

1. 《JavaScript设计模式与开发实践-曾探》