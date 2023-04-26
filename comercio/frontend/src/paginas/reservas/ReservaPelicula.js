import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPeliculasPorId } from "../../servicios/PeliculaServicio";
import { getReservasPorPeliID } from "../../servicios/ReservaServicio";
import NuevaReserva from "../../componentes/reservas/NuevaReserva";

export default function ReservaPeliculas() {
    const { id } = useParams();

    const [APIPelicula, setAPIPelicula] = useState()
    const [APIReservas, setAPIReservas] = useState()

    useEffect(() => {
        (async () => {
            const dataPel = await getPeliculasPorId(id)
            setAPIPelicula(dataPel)
            const dataRes = await getReservasPorPeliID(id)
            setAPIReservas(dataRes)
        })()

    }, []);

    return (
        <>
            {APIReservas? <NuevaReserva peliId={id} titulo={APIPelicula.titulo} reservas={APIReservas} asientosDisponibles={APIPelicula.asientos}/> : <span>Espere...</span>}
        </>
    );
}
