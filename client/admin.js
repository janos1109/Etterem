load();

function load() {
    setFieldsInvisible();
    loadMenu();
    loadOrder();
}

function setFieldsInvisible() {
    document.getElementById('editingArea').style.display = 'none';
    document.getElementById('menuField').style.display = 'none';
    document.getElementById('orderField').style.display = 'none';
    document.getElementById('itemField').style.display = 'none';
}

function toggleVisibility(id) {
    let field = document.getElementById(id);
    let itemField = document.getElementById('itemField');
    let displaySetting = field.style.display;

    if (displaySetting == 'block') {
        field.style.display = 'none';
        itemField.style.display = 'none';
    } else {
        setFieldsInvisible();
        field.style.display = 'block';
    }
}

function show(id) {
    toggleVisibility(id);
}

function loadMenu() {
    const url = 'http://localhost:3000/menu';
    const hely = document.getElementById('menuField');
    hely.innerHTML = '<button class="btn btn-success btn-large m-3 border border-light" onclick="addNewMenuItem()">Új elem hozzáadása</button>' +
                    '<div class="row bg-dark py-2 text-light border border-light" style="--bs-bg-opacity: .75;">' +
                        '<div class="col-sm-1 fw-bold">Id</div>' +
                        '<div class="col-lg-3 col-sm-4 fw-bold">Név</div>' +
                        '<div class="col-lg-1 col-sm-2 fw-bold">Ár</div>' +
                        '<div class="col-sm-3 fw-bold">Kép elérési helye</div>' +
                        '<div class="col-lg-1 col-sm-2 fw-bold">Fogás</div>' +
                    '</div>';
    fetch(url)
        .then((response) => response.json())
        .then(json => {
            json.forEach(f => {
                hely.innerHTML += 
                    '<div class="row bg-dark py-2 text-light border border-light text-break" style="--bs-bg-opacity: .75;">' +
                        '<div class="col-sm-1">' + f.id + '</div>' +
                        '<div class="col-lg-3 col-sm-4 text-warning">' + f.name + '</div>' +
                        '<div class="col-lg-1 col-sm-2">' + f.price + '</div>' +
                        '<div class="col-sm-3 text-warning">' + f.imgPath + '</div>' +
                        '<div class="col-lg-1 col-sm-2">' + f.course + '</div>' +
                        '<div class="col-lg-3">' +
                            '<button class="btn btn-danger mx-2 float-end border border-light" onclick="deleteMenuItem(' + f.id + ')">Törlés</button>' +
                            '<button class="btn btn-warning mx-2 float-end border border-light" onclick="editMenuItem(' + f.id + ')">Szerkeszt</button>' +
                        '</div>' +
                        '<div class="col-lg-2 col-sm-6 col-3"></div>' +
                    '</div>';
            });
        })
        .catch(err => console.log(err));
};

function loadOrder() {
    const url = 'http://localhost:3000/admin/order';
    const hely = document.getElementById('orderField');
    const token = 'Bearer: ' + sessionStorage.token;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then((response) => response.json())
        .then(json => {
            json.forEach(f => {
                if (f.messageFromUser === '') f.messageFromUser = ' - ';
                hely.innerHTML += 
                    '<div class="row bg-dark py-2 text-light border border-light text-break" style="--bs-bg-opacity: .75;">' +
                        '<div class="col-lg-8">' +
                            '<p><strong class="text-warning">Id: </strong>' + f.id + '<br>' + 
                            '<strong class="text-warning">Név: </strong>' + f.name + '<br>' + 
                            '<strong class="text-warning">Cím: </strong>' + f.country + '<br>' + 
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + f.city + '<br>' +
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + f.address + '<br>' +
                                '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + f.postcode + '<br>' +
                            '<strong class="text-warning">Mobil: </strong>' + f.mobile + '<br>' + 
                            '<strong class="text-warning">Email: </strong>' + f.email + '<br>' + 
                            '<strong class="text-warning">Rendelés időpontja: </strong>' + f.createdAt + '<br>' + 
                            '<strong class="text-warning">Összeg: </strong>' + f.total + ' Ft<br>' + 
                            '<strong class="text-warning">Üzenet: </strong> ' + f.messageFromUser + '<br></p>' + 
                        '</div>' +
                        '<div class="col-lg-4">' +
                            '<button class="btn btn-success w-50 float-end mx-2 border border-light m-2" onclick="showOrderItems(' + f.id + ')">Rendelt ételek</button>' +  
                            '<button class="btn btn-danger w-50 float-end mx-2 border border-light m-2" onclick="deleteOrder(' + f.id + ')">Töröl</button>' +
                        '</div>' +
                    '</div>';
            });
        })
        .catch(err => console.log(err));
};

function addNewMenuItem() {
    alert('Everything is fine, really! My id: ' + id);
}
function showOrderItems(id) {
    const hely = document.getElementById('itemField');
    const url = 'http://localhost:3000/admin/order/' + id;
    const token = 'Bearer: ' + sessionStorage.token;
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then((response) => response.json())
        .then(json => {
            hely.innerHTML = '<div class="bg-dark py-5 text-light border border-light text-break text-center" style="--bs-bg-opacity: .75;">' +
                                    '<h4>A rendelés tételei:</h4>' +
                                    '<h5>id: <strong class="text-warning"> ' + id + '</strong> ' +
                                '</div';
            hely.style.display = 'block';
            json.forEach(f => {
                hely.innerHTML +=
                    '<div class="bg-dark py-2 text-light border border-light text-break" style="--bs-bg-opacity: .75;">' +
                        '<div class="py-2 text-center">' +
                            '<div class="my-auto text-warning">' + f.name + '</div>' +
                            '<div class="my-auto">' + f.quantity + ' x ' + f.price + ' Ft</div>' +
                            '<div class="my-auto text-info">' + (f.quantity * f.price) + ' Ft</div>' +
                        '</div>' +
                    '</div>';
            });
        })
}

function deleteOrder(id) {

}

function signOut() {
    swal({
        title: 'Tényleg ki szeretnél jelentkezni?',
        icon: 'warning',
        buttons: ['Nem', 'Igen'],
    })
    .then((willSignOut) => {
        if (willSignOut) {
            sessionStorage.removeItem('token');
            document.location = 'index.html';
        }
    });
}