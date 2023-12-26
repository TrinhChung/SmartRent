const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const removeItem = (item) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      var removeMe = arr[i];
      arr[i] = arr[arr.length - 1];
      arr[arr.length - 1] = removeMe;
    }
  }
  console.log(arr);
};
