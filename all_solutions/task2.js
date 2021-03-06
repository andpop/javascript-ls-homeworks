/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i<array.length; i++) {
        fn(array[i], i, array);
    }
}

// =====================================================================================================
/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let resultArray = [];

    for (let i = 0; i<array.length; i++) {
        resultArray.push(fn(array[i], i, array));
    }

    return resultArray;
}

// =====================================================================================================
/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let i = 0;
    let result = initial || array[i++];

    while (i < array.length) {
        result = fn(result, array[i], i, array);
        i++;
    }

    return result;
}

// =====================================================================================================
/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    return Object.keys(obj).map(value => value.toUpperCase());
}

// =====================================================================================================
/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let resultArray = [];
    let startIndex = from,
        endIndex = to - 1;

    // Условия на начальный элемент
    if (from === undefined) {
        startIndex = 0;
    }
    if (from < 0) {
        startIndex = (array.length + from >= 0) ? array.length + from : 0;
    }

    // Условия на конечный элемент
    if (to === undefined) {
        endIndex = array.length - 1;
    }
    if (to > array.length - 1) {
        endIndex = array.length - 1;
    }
    if (to < 0) {
        endIndex = array.length - 1 + to;
    }

    // Копирование элементов в новый массив
    for (let i = startIndex; i <= endIndex; i++) {
        resultArray.push(array[i]);
    }

    return resultArray;
}

// =====================================================================================================
/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value*value;

            return true;
        }
    });

    return proxy;
}

// =====================================================================================================

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
