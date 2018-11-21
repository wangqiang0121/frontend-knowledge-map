var data = [85, 24, 63, 45, 17, 31, 96, 50];

/*
快速排序（Quicksort）的Javascript实现
http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
*/
var quickSort = function(arr) {
    if(arr.length <= 1) return arr;
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat([pivot], quickSort(right));
}

/* 冒泡排序 */
/* 选择排序 */