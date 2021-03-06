/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function isMatching(full, chunk) {
    return (new RegExp(chunk, 'i')).test(full);
}

filterNameInput.addEventListener('keyup', function () {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    displayCookiesInTable(getCookies());
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
    displayCookiesInTable(getCookies());
    // addNameInput.value = '';
    // addValueInput.value = '';
});


/* 
// Преобразование строки с куками в объект (имя свойства = имя куки, значение свойства = значение куки) - без фильтрации
function getCookies() {
    const allCookies = document.cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    const filter = filterNameInput.value;
    return allCookies;
}
*/

// Преобразование строки с куками в объект (имя свойства = имя куки, значение свойства = значение куки) + отбор по значению фильтра
function getCookies() {
    const filter = filterNameInput.value.trim(),
        filteredCookies = {};

    if (document.cookie.length > 0) {
        for (let cookieItem of document.cookie.split('; ')) {
            const [name, value] = cookieItem.split('=');
            if (filter === '' || isMatching(name, filter) || isMatching(value, filter)) {
                filteredCookies[name] = value;
            }
        }
    }

    return filteredCookies;
}

function displayCookiesInTable(cookies) {
    listTable.innerHTML = '';
    for (let cookieName in cookies) {
        if (cookies.hasOwnProperty(cookieName)) {
            const tr = document.createElement('tr');
            let rowContent = `<td>${cookieName}</td><td>${cookies[cookieName]}</td><td><button>Удалить</button></td>`;
            tr.innerHTML = rowContent;
            listTable.appendChild(tr);
        }
    }
}

function deleteCookie(name) {
    const date = new Date(0);

    document.cookie = `${name}=; expires=${date.toUTCString()}`;
    displayCookiesInTable(getCookies());
}

// Удаление cookie по кнопке "Удалить"
listTable.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        let cookieName = e.target.parentNode.previousElementSibling.previousElementSibling.textContent;

        deleteCookie(cookieName);
    }

})

// ==============================================================
const cookies = getCookies();

displayCookiesInTable(cookies);

