document.getElementById('login').onclick = function (e) {
    e.preventDefault();
    const url = 'http://localhost:3000/login';
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
        .then((response) => response.json())
        .then(() => window.open('admin.html', '_self'))
        .catch(err => {
            console.log(err);
            document.getElementById('message').innerHTML = 'Hibás felhasználó és/vagy jelszó!';
        })
}