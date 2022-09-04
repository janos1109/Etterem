/*function betoltes() {
    const url = 'http://localhost:3000/menu';
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            json.forEach(f => {
                const hely = document.getElementById('order' + f.course);
                hely.innerHTML += 
                    '<tr>' +
                        '<td><img src="' + f.imgPath + '_100_50.jpg" alt="' + f.name + '" class="img-fluid img-thumbnail"></td>' +
                        '<td>' + f.name + '</td>' +
                        '<td>' + f.price + ' Ft</td>' +
                        '<td><input type="number" step="1" min="1" max="10" value="1" name="quantity" class="quantity-field border-0 text-center">' +
                        '<button class="btn btn-dark ms-4">Hozzáad</button>' +
                    '</tr>';
            });
        })
        .catch(err => console.log(err));
        };

betoltes();*/

function betoltes() {
    const url = 'http://localhost:3000/menu';
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            json.forEach(f => {
                const hely = document.getElementById('order' + f.course);
                hely.innerHTML += 
                    '<div class="row py-2 border-top border-bottom border-secondary">' +
                        '<div class="col-lg-2 col-4"><img src="' + f.imgPath + '_100_50.jpg" alt="' + f.name + '" class="img-fluid img-thumbnail"></div>' +
                        '<div class="col-lg-3 col-8 my-auto">' + f.name + '</div>' +
                        '<div class="col-lg-2 col-6 d-flex flex-row-reverse my-auto">' + f.price + ' Ft</div>' +
                        '<div class="col-lg-2 col-3 d-flex flex-row-reverse my-auto"><p class="my-auto ms-2">db</p><input type="number" step="1" min="1" max="10" value="1" name="quantity" class="quantity-field border border-secondary text-center bg-dark text-light"></div>' +
                        '<div class="col-lg-2 col-3 my-auto"><button id="' + f.id + '" class="btn btn-dark border border-secondary">Hozzáad</button></div>' +
                    '</div>';
            });
        })
        .catch(err => console.log(err));
        };

betoltes();