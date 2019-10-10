var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];

function flatSortList(arr, list = []) {
  if (arr instanceof Array) {
    for (let i = 0; i <= arr.length; i++) {
        flatSortList(arr[i],list)
    }
  } else if (arr) {
    list.push(arr);
  }
  return [...new Set(list.sort((a,b) => a-b))];
}
