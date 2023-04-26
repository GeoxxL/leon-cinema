const express = require("express");
const app = express();
const cors = require('cors');
const cine = require('./cine.json')
const fs = require('fs');
const { json } = require("express");
const port = 5000;

//node src/app.js

app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


//Peliculas 



app.get('/pelicula', function (req, res) {
    res.json(cine.pelicula);
});

app.get('/pelicula/:id', function (req, res) {
    let id = req.params.id;
    let peliculas = cine.pelicula.filter(p => p.id == id)[0];
    res.json(peliculas);
});

app.post('/pelicula', (req, res) => {

    let id = cine.pelicula[cine.pelicula.length - 1].id + 1;
    let newMovie = { id, ...req.body };
    cine.pelicula.push(newMovie);
    fs.writeFileSync("./cine.json", JSON.stringify(cine));
    res.json(cine.pelicula);

});

app.put('/pelicula', (req, res) => {
    const { id } = req.query;
    const { titulo } = req.body;
    cine.pelicula.forEach(movie => {
        if (movie.id == id) {
            movie.titulo = titulo;
        }
    });
    fs.writeFileSync("../src/cine.json", JSON.stringify(cine));
    res.json(cine.pelicula);
});



app.put('/cambioCartelera/:id', (req, res) => {
    let id = req.params.id;
    let salaId = req.body.salaId;
    cine.pelicula.forEach(p => {
        if (p.id == id) {
           p.sala = salaId;
        }
    });
    fs.writeFileSync("./cine.json", JSON.stringify(cine));
    res.json(cine);
});


app.put('/reservarAsientos/:id', (req, res) => {
    let id = req.params.id;
    let asiento = req.body.asiento;
    cine.pelicula.forEach(p => {
        if (p.id == id) {
           p.asientos = asiento;
        }
    });
    fs.writeFileSync("./cine.json", JSON.stringify(cine));
    res.json(cine);
});

app.delete('/pelicula/:id', (req, res) => {
    let id  = req.params.id;

    cine.pelicula.forEach(p => {
        if (p.id == id) {
            cine.pelicula.splice(cine.pelicula.indexOf(p),1) 
        }
    });
    
    
    fs.writeFileSync("./cine.json", JSON.stringify(cine));
    res.json(cine);
});

app.delete('/PeliculaReservas/:id', (req, res) => {
    let id = req.params.id;

    
    cine.reserva.forEach(r => {
        if (r.peliId == id) {
            cine.reserva.splice(cine.reserva.indexOf(r), 1);
        }
    });
    fs.writeFileSync("./cine.json", JSON.stringify(cine));
    res.json(cine);
});

//Reservas 

app.get('/reserva', function (req, res) {
    res.json(cine.reserva);
});

app.get('/reserva/:id', function (req, res) {
    let id = req.params.id;
    let reserva = cine.reserva.filter(r => r.peliId == id);
    res.json(reserva);
});

app.post('/reserva', (req, res) => {

    let id = cine.reserva[cine.reserva.length - 1].id + 1;
    let nuevaRes = { id, ...req.body };
    cine.reserva.push(nuevaRes);
    fs.writeFileSync("./cine.json", JSON.stringify(cine));
    res.json(cine);

});

app.put('/reserva/:id', (req, res) => {
    const { id } = req.params.id;
    const { cantiAsientos, salaId } = req.body;
    if (cantiAsientos && salaId) {
        cine.reserva.forEach(r => {
            if (r.id == id) {
                r.cantAsientos = cantiAsientos;
                r.salaId = salaId;
            }
        });
        fs.writeFileSync("./cine.json", JSON.stringify(cine));
        res.json(cine);
    }
    else {
        res.send('<div>hubo un error editando la pelicula</div>');
    }
});

app.delete('/reserva/:id', (req, res) => {
    const { id } = req.params.id;
    cine.reserva.forEach(r => {
        if (r.id == id) {
            cine.reserva.splice(cine.reserva.indexOf(r), 1);
        }
    });
    fs.writeFileSync("./cine.json", JSON.stringify(cine));
    res.json(cine);
});