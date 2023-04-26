import { Button} from "@mui/material";
import { useState, useEffect } from "react";
import { getPeliculas, cambiarCartelera, borrarPelicula } from "../../servicios/PeliculaServicio";

import Read from "../../componentes/peliculas/Read";

import BorrarPeli from "../../componentes/peliculas/BorrarPeli";

export default function Home() {

    const [APIData, setAPIData] = useState();



    useEffect(() => {
        (async () => {
            const data = await getPeliculas()
            setAPIData(data)
        })()
    }, []);


    const actualizar = async (id, nuevaSala) => {
        await cambiarCartelera(id, nuevaSala)
        const data = await getPeliculas()
        setAPIData(data)
        alert("La pelicula se agregó correctamente")
    }

    const borrar = async (id) => {
        await borrarPelicula(id)
        const data = await getPeliculas()
        setAPIData(data)
        alert("La pelicula se borró correctamente")
    }

    return (
        <div style={{ textAlign: "center" }}>
        <div>
            {APIData ?//contrasena == "gwenbere" ?
                <div>
                    <Button href="/peliculas/nueva" color="inherit" >Crear Pelicula</Button>
                    {APIData.map(pelicula => {
                        return (
                                  <>
                                  {pelicula.id == 0 ? <></> :  <>
                                  <div style={{ marginBottom: 20 }} key={pelicula.id}  >
                                <Read id={pelicula.id} titulo={pelicula.titulo} sala={pelicula.sala} actualizar={actualizar} />
                                <BorrarPeli id={pelicula.id} borrar={borrar}>Borrar Pelicula</BorrarPeli>
                            </div>
                                  </>}
                            
                            </>
                        )

                    })}
                </div> :
                
               <> espere ...</>
               
            }
        </div>
        </div>
    )
};
