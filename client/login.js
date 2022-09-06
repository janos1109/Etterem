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
            "name": document.getElementById('name').value,
            "password": document.getElementById('password').value
        })
    })
        .then((response) => {
            ok = response.ok;
            return response.json();
        })
        .then(json => {
            sessionStorage.token = json.token;
            if (ok) document.location = 'admin.html';
        })
        .catch(err => {
            console.log(err);
            document.getElementById('message').innerHTML = '<p class="text-danger p-3">Hibás felhasználó és/vagy jelszó!</p>';
        })
}