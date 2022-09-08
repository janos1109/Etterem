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

function toggleVisibility(fieldId) {
    let field = document.getElementById(fieldId);
    let displaySetting = field.style.display;

    let itemField = document.getElementById('itemField');
    if (displaySetting == 'block') {
        field.style.display = 'none';
        itemField.style.display = 'none';
    } else {
        setFieldsInvisible();
        field.style.display = 'block';
    }
}

function loadMenu() {
    const url = 'http://localhost:3000/menu';
    const hely = document.getElementById('menuField');
    hely.innerHTML = '<button class="btn btn-success btn-large m-3 border border-light" onclick="showEditingArea(0)">Új elem hozzáadása</button>' +
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
                    '<button class="btn btn-warning mx-2 float-end border border-light" onclick="showEditingArea(' + f.id + ')">Szerkeszt</button>' +
                    '</div>' +
                    '<div class="col-lg-2 col-sm-6 col-3"></div>' +
                    '</div>';
            });
        })
        .catch(err => console.log(err));
}

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
                    '<div class="row bg-dark py-2 mb-2 text-light border border-light text-break" style="--bs-bg-opacity: .75;">' +
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
}

function addNewMenuItem() {
    const url = 'http://localhost:3000/admin/menu';
    const token = 'Bearer: ' + sessionStorage.token;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Authorization': token
        },
        body: JSON.stringify({
            "name": document.getElementById('fname').value,
            "price": document.getElementById('fprice').value,
            "imgPath": document.getElementById('fimg').value,
            "course": document.getElementById('fcourse').value
        })
    })
        .then(() => {
            swal({
                title: 'Siker!',
                text: 'Az új elem hozzáadása sikeresen megtörtént!',
                icon: 'success',
                button: 'Ok'
            })
                .then(() => refresh())
        })
        .catch(err => console.log(err));
}

function editMenuItem(id) {
    const url = 'http://localhost:3000/admin/menu/' + id;
    const token = 'Bearer: ' + sessionStorage.token;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Authorization': token
        },
        body: JSON.stringify({
            "name": document.getElementById('fname').value,
            "price": document.getElementById('fprice').value,
            "imgPath": document.getElementById('fimg').value,
            "course": document.getElementById('fcourse').value
        })
    })
        .then(() => {
            swal({
                title: 'Siker!',
                text: 'A módosítás sikeresen megtörtént!',
                icon: 'success',
                button: 'Ok'
            })
                .then(() => refresh())
        })
        .catch(err => console.log(err));
}

function deleteMenuItem(id) {
    swal({
        title: 'Biztosan törölni szeretnéd ezt az ételt az étlapról?',
        icon: 'warning',
        buttons: ['Nem', 'Igen'],
    })
        .then((willDelete) => {
            if (willDelete) {
                const url = 'http://localhost:3000/admin/menu/' + id;
                const token = 'Bearer: ' + sessionStorage.token;
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json;charset=utf-8',
                        'Authorization': token
                    },
                    body: JSON.stringify({
                        "id": id
                    })
                })
                    .then(() => {
                        swal({
                            title: 'Siker!',
                            text: 'A rendelés visszavonása sikeresen megtörtént!',
                            icon: 'success',
                            button: 'Ok'
                        })
                            .then(() => refresh())
                    })
                    .catch(err => console.log(err));
            }
        });
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

function showEditingArea(id) {
    toggleVisibility('editingArea');

    if (id == 0) {
        document.getElementById('btnSubmit').innerHTML = 'Új elem hozzáadása';
        document.getElementById('fid').value = '#';
        document.getElementById('fname').value = '';
        document.getElementById('fprice').value = '';
        document.getElementById('fimg').value = '';
        document.getElementById('fcourse').value = 'Starter';

        document.getElementById('btnSubmit').onclick = (e) => {
            e.preventDefault();
            addNewMenuItem();
        }
    } else {
        document.getElementById('btnSubmit').innerHTML = 'Módosít';
        const url = 'http://localhost:3000/menuitems/' + id;
        fetch(url)
            .then((response) => response.json())
            .then(json => {
                document.getElementById('fid').value = json[0].id;
                document.getElementById('fname').value = json[0].name;
                document.getElementById('fprice').value = json[0].price;
                document.getElementById('fimg').value = json[0].imgPath;
                document.getElementById('fcourse').value = json[0].course;
            })
            .catch(err => console.log(err));
        document.getElementById('btnSubmit').onclick = (e) => {
            e.preventDefault();
            editMenuItem(id);
        }
    }
}

function deleteOrder(id) {
    swal({
        title: 'Biztosan törölni szeretnéd ezt a rendelést?',
        icon: 'warning',
        buttons: ['Nem', 'Igen'],
    })
        .then((willDelete) => {
            if (willDelete) {
                const url = 'http://localhost:3000/admin/order/' + id;
                const token = 'Bearer: ' + sessionStorage.token;
                fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json;charset=utf-8',
                        'Authorization': token
                    },
                    body: JSON.stringify({
                        "id": id
                    })
                })
                    .then(() => {
                        swal({
                            title: 'Siker!',
                            text: 'A rendelés visszavonása sikeresen megtörtént!',
                            icon: 'success',
                            button: 'Ok'
                        })
                            .then(() => document.location = 'admin.html')
                    })
                    .catch(err => console.log(err));
            }
        });
}

function refresh() {
    loadMenu();
    toggleVisibility('menuField');
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