let cart = [];
let sum = 0;

betoltes();
updateCartList();

function betoltes() {
    if (sessionStorage.cartItems != null) {
        cart = JSON.parse(sessionStorage.cartItems);
    }
    document.getElementById('')
    const url = 'http://localhost:3000/menu';
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            json.forEach(f => {
                const hely = document.getElementById('order' + f.course);
                hely.innerHTML +=
                    '<div class="row py-2 border-top border-secondary">' +
                    '<div class="col-lg-2 col-4"><img src="' + f.imgPath + '_100_50.jpg" alt="' + f.name + '" class="img-fluid img-thumbnail"></div>' +
                    '<div class="col-lg-3 col-8 my-auto">' + f.name + '</div>' +
                    '<div class="col-lg-2 col-6 d-flex flex-row-reverse my-auto">' + f.price + ' Ft</div>' +
                    '<div class="col-lg-2 col-3 d-flex flex-row-reverse my-auto"><p class="my-auto ms-2">db</p><input type="number" id="qty' + f.id + '" step="1" min="1" max="10" value="1" name="quantity" class="quantity-field border border-secondary text-center bg-dark text-light"></div>' +
                    '<div class="col-lg-2 col-3 my-auto"><button class="btn btn-dark border border-secondary" onclick="btnHozzaad(' + f.id + ')">Hozzáad</button></div>' +
                    '</div>';
            });
        })
        .catch(err => console.log(err));
};

function btnHozzaad(id) {
    const url = 'http://localhost:3000/menuitems/' + id;
    const qty = Number(document.getElementById('qty' + id).value);

    fetch(url)
        .then((response) => response.json())
        .then(json => {
            let newItem = {
                id: json[0].id,
                name: json[0].name,
                quantity: qty,
                price: json[0].price
            };
            addToCart(newItem);
            updateCartList();
        })
        .catch(err => console.log(err));
};

function addToCart(newItem) {
    let index = cart.findIndex(x => x.id === newItem.id);
    if (index === -1) {
        cart.push(newItem);
    } else {
        cart[index].quantity += newItem.quantity;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartList();
}

function updateCartList() {
    const cartElem = document.getElementById('cart');
    const sumElem = document.getElementById('osszesen');

    sessionStorage.cartItems = JSON.stringify(cart);

    if (cart.length === 0) {
        cartElem.innerHTML = 'Üres a kosarad!';
        sumElem.innerHTML = '';
        document.getElementById('btnOrder').disabled = true;
    } else {
        cartElem.innerHTML = '';
        let index = 0;
        sum = 0;
        cart.forEach(c => {
            cartElem.innerHTML +=
                '<div class="row py-2 border-top border-secondary">' +
                '<div class="col-12 my-auto text-warning">' + c.name + '</div>' +
                '<div class="col-sm-5 my-auto">' + c.quantity + ' x ' + c.price + ' Ft</div>' +
                '<div class="col-sm-5 my-auto">' + (c.quantity * c.price) + ' Ft</div>' +
                '<div class="col-sm-1"><button class="btn btn-dark border border-secondary rounded-circle" onclick="removeFromCart(' + index + ')">x</button></div>' +
                '</div>';
            sum += c.quantity * c.price;
            index++;
            sumElem.innerHTML = '<h6 class="text-info">Összesen: ' + sum + ' Ft</h6>';
            document.getElementById('btnOrder').disabled = false;
        });
    }

}

document.getElementById('btnOrder').onclick = function (e) {
    e.preventDefault();
    sessionStorage.cartItems = JSON.stringify(cart);
    window.open('placeorder.html', '_self');
}