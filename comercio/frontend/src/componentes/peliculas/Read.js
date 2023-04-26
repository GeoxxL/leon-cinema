import { useState } from "react";
import { MenuItem, Select, TextField, Button } from "@mui/material";

export default function Read(props) {

  const { id, titulo, sala, actualizar } = props;

  const [nuevaSala, setNuevaSala] = useState(0);

  return (

    <div style={{ display: "flex", alignItems: "center", textAlign: "center"}}>
      <TextField size="small" value={titulo} disabled />
      {sala == 0 ?
        <Select displayEmpty onChange={(e) => setNuevaSala(e.target.value)}>
          <MenuItem disabled>
            <em>Elija una sala</em>
          </MenuItem>
          <MenuItem value={1} >Sala 1</MenuItem>
          <MenuItem value={2}>Sala 2</MenuItem>
          <MenuItem value={3}>Sala 3</MenuItem>
        </Select> :
        `Disponible en la sala ${sala}`}
      <Button size="large" onClick={() => {
        actualizar(id, nuevaSala);
        setNuevaSala(0)
      }}>
        {sala == 0 ? "Seleccionar Sala " : "Cambiar a 'fuera de cartelera' "}
      </Button>
    </div>
  )
}

