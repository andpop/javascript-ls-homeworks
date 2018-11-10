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
        maxDivWidth = document.documentElement.clientWidth - 100,
        maxDivHeight = document.documentElement.clientHeight - 100;
    const width = randomInt(minDivWidth, maxDivWidth);
    const height = randomInt(minDivHeight, maxDivHeight);
    const top = randomInt(0, maxDivHeight - height);
    const left = randomInt(0, maxDivWidth - width);
    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.width = width + 'px';
    div.style.height = height + 'px';
    div.style.top = top + 'px';
    div.style.left = left + 'px';
    div.style.backgroundColor = randomColor();
    div.className = 'draggable-div';
    div.setAttribute('draggable', true);
    // Генерируем уникальный id для создаваемого элемента div
    div.setAttribute('id', new Date().getTime());

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
    target.addEventListener('dragstart', event => {
        const leftMargin = event.clientX - parseInt(event.target.style.left, 10);
        const topMargin = event.clientY - parseInt(event.target.style.top, 10);

        event.target.style.opacity = '0.6';
        event.dataTransfer.effectAllowed='move';
        event.dataTransfer.setData('id', event.target.id);
        event.dataTransfer.setData('leftMargin', leftMargin);
        event.dataTransfer.setData('topMargin', topMargin);
        homeworkContainer.style.top = 0;
        homeworkContainer.style.left = 0;
    });
}

function setContainerProperties() {
    // Контейнер растягиваем на весь экран, чтобы перемещаемый элемент в него попадал
    homeworkContainer.style.position = 'relative';
    homeworkContainer.style.width = document.documentElement.clientWidth + 'px';
    homeworkContainer.style.height = document.documentElement.clientHeight + 'px';
}

function addContainerListeners() {
    // Делаем контейнер способным принять перемещаемый объект
    homeworkContainer.addEventListener('dragover', event => {
        event.preventDefault();
    });

    // Меняем свойства left и top для рендеринга перемещенного объекта
    homeworkContainer.addEventListener('drop', event => {
        const id = event.dataTransfer.getData('id');
        const movedDiv = document.getElementById(id);
        const left = event.clientX - event.dataTransfer.getData('leftMargin');
        const top = event.clientY - event.dataTransfer.getData('topMargin');

        event.preventDefault();
        movedDiv.style.opacity = '1';
        movedDiv.style.left = left + 'px';
        movedDiv.style.top = top + 'px';
    })
}

setContainerProperties();
addContainerListeners();

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
