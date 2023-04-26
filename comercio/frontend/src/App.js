import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./paginas/Layout";
import Home from "./paginas/Home";
import Peliculas from "./paginas/peliculas/Peliculas";
import ReservaPelicula from "./paginas/reservas/ReservaPelicula";
import Reservas from "./paginas/reservas/Reservas";
import Salas from "./paginas/salas/Salas";
import ModificarPeliculas from "./paginas/peliculas/ModificarPeliculas";
import "./App.css"
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Box } from "@mui/system";

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins'
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          margin: 8
        }
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          color:"#000000"
        }
      }
    },
    MuiTextField:{
      styleOverrides:{
        root:{
          background:"white"
        }
      }
    }
  },
  palette: {
    background: {
      default: " LightGray"
    },
    text: {
      primary: "#000000"
    },
    primary:{
      main: "#FF0000 "
    }
  }
})

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/><Box></Box>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="peliculas" element={<Peliculas />}></Route>
            <Route path="peliculas/nueva" element={<ModificarPeliculas />}></Route>
            <Route path="reservas" element={<Reservas />}></Route>
            <Route path='/reservas/:id' element={<ReservaPelicula />} ></Route>
            <Route path="salas" element={<Salas />}></Route>
            <Route path="*" element={<h1>404</h1>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}