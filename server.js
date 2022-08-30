const express = require('express'); //beimportálja az express modult
//const path = require('path');
const app = express();      //létrehoz egy új szerver alkalmazást
app.use(express.urlencoded({extended: true}));      //Ennek hatására a program minden beérkező kérést először elemez, kigyűjti belőle a formon elküldött adatokat, egy objektummá alakítja és így adja tovább a kérést kezelő programrésznek.
app.set("view engine", "ejs");      //Megadjuk, hogy EJS sablonokat használunk.

//Egy weboldal letöltésekor a böngésző egy get kérést (request) küld a webszervernek, amely erre válaszol (respond).
//A / jel a kezdő (root) oldalt jelenti
//Ezt az app objektum get metódusával tudjuk megtenni. Az első paraméter azt adja meg, hogy a kezdő oldal (root) kérés esetén kell lefuttatni a második helyen megadott callback függvényt.
//A callback függvény eéső paramétere a kérés (request), a második a válasz (respond). A paramétereknek tetszőleges nevet adhatunk.
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/client/views/index.html');
});

app.get('/order', (request, response) => {
    response.sendFile(__dirname + '/client/views/order.html');      //A sendFile metódussal a szerver egy fájlt küld a kliensnek válaszként a kérdésre. A __dirname változó a JavaScript fájl elérési útja a szerveren.
});

//Azt hogy mi történjen post kérés esetén, az app.post metódussal adhatjuk meg.
app.post("/", function(request, response) {
    console.log(request.body);
    response.send("Köszönöm!");
})

app.listen(3000, () => {            //elindítja a szerveralkalmazást úgy, hogy a 3000-es porton figyeli a kéréseket
    console.log("Szerver elindítva a 3000-es porton...");       //a listen metódusban meghívunk egy callback függvényt, amit meghív a szerver indítása után
});