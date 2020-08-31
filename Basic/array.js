/*
 * 数组去重
 */

var data = [1, 8, 5, 5, 43, 87, 33, 8, 9];

// 1. 利用数组indexOf方法
function unique(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
}

// 2. 利用对象key值唯一。或者说是利用hash表。会把1和'1'算作重复
function unique(arr) {
  var hash = {},
    result = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;
      result.push(arr[i]);
    }
  }
  return result;
}

// 3. 排序后比较相邻元素，如果不一样就加入result
function unique(arr) {
  arr.sort();
  var result = [arr[0]];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      result.push(arr[i]);
    }
  }
  return result;
}

// 4. 两层循环一一对比
function unique(arr) {
  if (arr.length == 0) return;
  var result = [arr[0]],
    isRepeat;
  for (var i = 0, j = arr.length; i < j; i++) {
    isRepeat = false;
    for (var k = 0, h = result.length; k < h; k++) {
      if (result[k] === arr[i]) {
        isRepeat = true;
        break;
      }
      if (k === h) break;
    }
    if (!isRepeat) result.push(arr[i]);
  }
  return result;
}

/**
 * 数组拆解 flat: [1,[2,3]] => [1,2,3]
 */
Array.prototype.flat = function () {
  // [1,[2,3]].toString() => '1,2,3'
  return this.toString()
    .split(",")
    .map((item) => +item);
};

/* 数组判断 */
// 1、使用isArray
Array.isArray(data);
// 2、使用instanceof
data instanceof Array;
// 3、使用toString()
Object.prototype.toString.call(data).slice(8, -1) === "Array";
