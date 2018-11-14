fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json').then(response => response.json()).then(json => {
    console.log(json);
});
