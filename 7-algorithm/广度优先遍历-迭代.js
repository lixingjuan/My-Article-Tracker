const root = {
  name: "A",
  children: [
    {
      name: "B1",
      children: [
        {
          name: "C1",
          children: [
            {
              name: "D1",
            },
            {
              name: "D2",
              children: [{ name: "F1" }, { name: "F2" }, { name: "F3" }],
            },
            {
              name: "D3",
            },
          ],
        },
      ],
    },
    {
      name: "B2",
      children: [{ name: "C2" }, { name: "C3" }, { name: "C4" }],
    },
    {
      name: "B3",
    },
  ],
};

/* 广度优先遍历 */
function breadthFirst(node) {
  if (!node) {
    return;
  }
  let stack = []; // 存放待循环队列
  let result = []; // 存放遍历后的结果
  let tmpNode; // 当前处理的节点

  stack.push(node);
  while (stack.length) {
    // stack 里面存的其实永远都是某个节点的所有子节点, 都是未遍历过的节点
    tmpNode = stack.shift();
    // 每次都是一层遍历完再去遍历下一层
    // 拿到一个节点，就立刻把他的名字放到结果数组
    result.push(tmpNode.name);
    if (tmpNode.children && tmpNode.children.length) {
      // 当前节点的字节点们都放在当前
      tmpNode.children.reverse().map((item) => stack.push(item));
    }
  }
  return result;
}

console.log(breadthFirst(root));
