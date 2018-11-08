/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

// Функция возвращает целое число в диапазоне от min до max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Функция генерирует случайный цвет в формате RGB
function randomColor() {
    const r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));

    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    const minDivWidth = 50,
        minDivHeight = 50,
        maxDivWidth = document.documentElement.clientWidth - 50,
        maxDivHeight = document.documentElement.clientHeight - 50;
    const div = document.createElement('div');

    // console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
    div.style.position = 'absolute';
    div.style.width = randomInt(minDivWidth, maxDivWidth) + 'px';
    div.style.height = randomInt(minDivHeight, maxDivHeight) + 'px';
    div.style.backgroundColor = randomColor();
    div.className = 'draggable-div';

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const newDiv = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(newDiv);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(newDiv);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
