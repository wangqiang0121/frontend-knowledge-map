/**
 * 扑克牌问题
 *
 * 描述
 * 我手中有一堆扑克牌， 但是观众不知道它的顺序。
 * 第一步， 我从牌顶拿出一张牌， 放到桌子上。
 * 第二步， 我从牌顶再拿一张牌， 放在手上牌的底部。
 * 第三步， 重复第一步、第二步的操作， 直到我手中所有的牌都放到了桌子上。
 * 最后， 观众可以看到桌子上牌的顺序是：(牌底部）1,2,3,4,5,6,7,8,9,10,11,12,13(牌顶部）
 * 请问， 我刚开始拿在手里的牌的顺序是什么？
 */
function getCardsOrder(output) {
  const input = [];
  let startIndex = 0;
  let endIndex = output.length - 1;

  while (startIndex <= endIndex) {
    if (startIndex === endIndex) {
      input.push(output[endIndex]);
      break;
    }
    input.push(output[startIndex], output[endIndex]);
    startIndex++;
    endIndex--;
  }
  return input;
}
let output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let callback = getCardsOrder(output);
console.log(callback);
