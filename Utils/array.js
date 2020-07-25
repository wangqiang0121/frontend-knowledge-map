/**
 * 数组拆解 flat: [1,[2,3]] => [1,2,3]
 */
Array.prototype.flat = function() {
  // [1,[2,3]].toString() => '1,2,3'
  return this.toString().split(',').map(item => +item )
}
