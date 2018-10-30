const arr = [1, 2, 3, 4, 5, 6];
// const arr = [1];

function slice(array, from, to) {
    let resultArray = [];
    let startIndex = from, endIndex = to

    if (from === undefined) {
        startIndex = 0;
    }

    if (from < 0) {
        startIndex = array.length + from;
    }

    if (to === undefined) {
        endIndex = array.length - 1;
    }
    if (to > array.length - 1) {
        endIndex = array.length - 1;
    }

    for (let i = startIndex; i <= endIndex; i++) {
        resultArray.push(array[i]);
    }

    return resultArray;
}

const resultArr = slice(arr, -2);

console.log(resultArr);