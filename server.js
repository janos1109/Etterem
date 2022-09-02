const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', (request, response) => {
    response.render(__dirname + '/views/index.ejs');
});

app.get('/order', (request, response) => {
    response.sendFile(__dirname + '/views/order.html');
});

app.post("/", function(request, response) {
    console.log(request.body);
    response.send("Köszönöm!");
})

app.listen(3000, () => {
    console.log("Szerver elindítva a 3000-es porton...");
});