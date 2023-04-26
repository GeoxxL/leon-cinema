import { nuevaPelicula } from "../../servicios/PeliculaServicio";
import { useState, useEffect } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { getPeliculas, } from "../../servicios/PeliculaServicio";


export default function NuevaPeli() {

    const [inputTitulo, setTitulo] = useState("")
    const [sala, setSala] = useState(0)
    //let asientosP = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
    const [asientos, setAsientos] = useState([0])
    const [filas, setFilas] = useState(1)
    const [columnas, setColumnas] = useState(1)
    const [APIData, setAPIData] = useState();

    const nuevafila = (e) => setFilas(e.target.value);
    const nuevaColumna = (e) => setColumnas(e.target.value);

    const nuevaSala = () => {
        let aux = []
        for (let y = 0; y < filas; y++) {
            aux.push([])
            for (let x = 0; x < columnas; x++) {

                aux[y].push(0)
            }
        }
        setAsientos(aux)
        return aux
    }



    useEffect(() => {
        (async () => {
            const data = await getPeliculas()
            setAPIData(data)
        })()
    }, []);

    let repetida = false;

    const validar = (nuevosAsientos) => {


        APIData.forEach(d => {
            if (d.titulo == inputTitulo) {
                repetida = true
            }
        })

        // console.log(APIData)


        if (inputTitulo == "") {
            alert("escriba algo valido");

        }
        else if (repetida) {

            alert("ya existe esa pelicula")

        }
        else {
            alert(`Se agregó la pelicula ${inputTitulo} Correctamente!`)
            nuevaPelicula(inputTitulo, sala, nuevosAsientos ? nuevosAsientos: asientos)
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <label>Titulo</label>
            <input
                onChange={(e) => setTitulo(e.target.value)}
                type="text"
                placeholder="Titulo"
            />
            <br />
            <label>Sala</label>
            <Select displayEmpty onChange={(e) => setSala(e.target.value)}>
                <MenuItem disabled>
                    <em>Elija una sala</em>
                </MenuItem>
                <MenuItem value={1} >Sala 1</MenuItem>
                <MenuItem value={2}>Sala 2</MenuItem>
                <MenuItem value={3}>Sala 3</MenuItem>
            </Select>
            <input onChange={nuevafila} type="number" min="1" placeholder="filas" />
            <input onChange={nuevaColumna} type="number" min="1" placeholder="filas" />
            <Button href="/peliculas" onClick={() => { var nuevosAsientos = nuevaSala(); validar(nuevosAsientos) }}>Agregar</Button>
            <Button href="/peliculas">Volver</Button>
        </div>
    );
}