import { Button,} from "@mui/material";
import { borrarReservas } from "../../servicios/ReservaServicio";

export default function BorrarPeli(props) {

    const { id, borrar } = props;

    return (
        <div>
            <Button 
            onClick={()=>{

                borrar(id)
                
                borrarReservas(id)

                }}>
                Borrar
                </Button>
        </div>
    );
}