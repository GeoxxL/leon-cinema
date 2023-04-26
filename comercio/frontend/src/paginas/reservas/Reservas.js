import { getPeliculas } from "../../servicios/PeliculaServicio";
import { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";

export default function Reservas() {
  const [APIData, setAPIData] = useState()

  useEffect(() => {
    (async () => {
      const data = await getPeliculas()
      setAPIData(data)
    })()
  }, []);

  

  return (
    <>{}
      <div style={{ textAlign: "center" }}>
        <Typography>Reservas</Typography>
        <div className="render-boton">
          {APIData ?
            APIData.map((pelicula) => {
              return (
                <>
                  <Button href={"/reservas/" + pelicula.id}>{pelicula.titulo}</Button>
                </>
              )
            }) 
            : <>'Espere...'</>}
        </div>
      </div>
    </>
  );
};