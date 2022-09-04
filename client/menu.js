function betoltes() {
    const url = 'http://localhost:3000/menu';
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            json.forEach(f => {
                const hely = document.getElementById('menu' + f.course);
                hely.innerHTML += 
                    '<div class="col-lg-2 col-md-4 mb-3">' +
                        '<div class="card h-100 bg-dark">' +
                            '<img class="card-img-top" src="' + f.imgPath + '_200.jpg" alt="' + f.name + '">' +
                            '<div class="card-body d-flex flex-column">' +
                                '<h6>' + f.name + '</h6>' +
                                '<div class="mt-auto">' +
                                '<hr>' +
                                '<p class="mb-0">' + f.price + ' Ft</p>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
            });
        })
        .catch(err => console.log(err));
        };

betoltes();