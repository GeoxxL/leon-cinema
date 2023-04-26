import { useEffect, useState } from "react";
import { Button, Divider, MenuItem, Select } from "@mui/material";
import { nuevaReserva } from "../../servicios/ReservaServicio";
import { useNavigate } from "react-router-dom";
import { reservarAsientos } from "../../servicios/PeliculaServicio";

export default function NuevaReserva(props) {

  const {peliId, titulo, reservas, asientosDisponibles } = props;
  const [cantEntradas, setCantEntradas] = useState(0);
  const [asientos, setAsientos] = useState(40);
  const navigate = useNavigate();
  const [Contaux, setContAux] = useState(0);

const reservaAsientos = (a,b) => {

if (cantEntradas == 0){alert('primero debe seleccionar el numero de entradas')}

else if (Contaux >= cantEntradas)
{
alert('ya eligio todos sus asientos')
}
else
{
  
 asientosDisponibles[a][b] = "r";
  //alert(asientosDisponibles)
setContAux(Contaux + 1)}
}

  
  useEffect(() => {
    let aux = 0;
    reservas.forEach(r => {
      aux = aux + r.cantAsientos;
    });
    setAsientos(asientosDisponibles.length * asientosDisponibles[0].length - aux)
  }, []);

  const validar = async () => {
    
    if(cantEntradas == 0)
    {
        alert("Ingrese una cantidad de entradas valida")
      }
        else if (cantEntradas > asientos) 
        {
          alert(`solo quedan ${asientos} entradas`)
        }
         else if(Contaux != cantEntradas)
         {
          alert('debe seleccionar los asientos')
         }
        else {
          await nuevaReserva(cantEntradas, peliId);
          await reservarAsientos(peliId, asientosDisponibles)
          alert("Reserva Completada!")
          navigate(-1);
        }
    
  }


  return (
  <div style={{ textAlign: "center" }}> 
   <br></br>
  <div>Cantidad de entradas seleccionadas: {cantEntradas}</div>
  <br></br>
  {cantEntradas > asientos || cantEntradas == 0 ?
   <>
    {asientosDisponibles?
    <div>
      <h3>QUEDAN {asientos} ENTRADAS PARA: {titulo}</h3>
      <Select displayEmpty onChange={(e) => {{setCantEntradas(e.target.value)}{if (cantEntradas < asientos){/*alert(`Solo quedan ${asientos} disponibles`)*/}}}}>
        <MenuItem disabled>
          <em>Elija una cantidad de entradas</em>
        </MenuItem>
        <MenuItem value={1}> 1 ENTRADA </MenuItem>
        <MenuItem value={2}> 2 ENTRADAS </MenuItem>
        <MenuItem value={3}> 3 ENTRADAS </MenuItem>
        <MenuItem value={4}> 4 ENTRADAS </MenuItem>
        <MenuItem value={5}> 5 ENTRADAS </MenuItem>
      </Select>
      <br />
    </div>
    : <span>Espere...</span>}
  </> :
   <>
    <div>
      {asientosDisponibles.map((filas, indexF) => {
      
                        return (
                            filas.map((columnas, indexC) =>{
                              
                              return(<>{asientosDisponibles[indexF][indexC] == 'r' ?
                               <>
                                 <Button disabled={true} style={{ backgroundColor: "red"}}>{indexF} : {indexC}</Button> 

                              </>:
                              <>
                              <Button onClick={() => {reservaAsientos(indexF,indexC)}}
                                 style={{ backgroundColor: "darkGrey"}}>{indexF} : {indexC}</Button> 
                              </>}
                                <> </>
                                {indexC == asientosDisponibles[0].length - 1 ? <><br></br><br></br></>  : ""}
                                </>
                              )
                            })
                        )
                    })}
      </div>
      <br></br>
      <Button onClick={() => validar()}>Confirmar Reserva</Button>
      <Button href="/reservas">Volver</Button>
  </>}
 
    </div>
    );
}