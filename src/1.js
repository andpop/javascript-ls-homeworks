const human = {
    name: 'Andrey',
    lastName: 'Popov',
    job: 'Кондитер'
}

const properties = Object.keys(human);
const upperProps = properties.map(value => value.toUpperCase());
console.log(upperProps);