document.getElementById('login').onclick = function (e) {
    e.preventDefault();
    let ok = false;
    const url = 'http://localhost:3000/admin/login';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "username": document.getElementById('username').value,
            "password": document.getElementById('password').value
        })
    })
        .then((response) => {
            ok = response.ok;
            return response.json();
        })
        .then(json => {
            document.getElementById('message').innerHTML = '<p class="text-light p-3">' + json.message + '</p>';
            if (ok) {
                sessionStorage.token = json.token;
                showMessageSuccessAndLogin(json.message);
            }
        })
        .catch(err => console.log(err));
}

function showMessageSuccessAndLogin(message) {
    swal({
        title: message,
        icon: 'success',
        button: 'Ok'
    })
    .then(() => document.location = 'admin.html');
}