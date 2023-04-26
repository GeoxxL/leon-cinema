import { Outlet } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, Link } from "@mui/material";


export default function Layout() {
  return (
    <>
      <AppBar position="static" style={{ display: "flex", justifyContent: "space-around" }}>
        <Toolbar>
          <Link href="/" color="inherit" underline="none"><Typography variant="h4">Cine Leon</Typography></Link>
          <Link href="/peliculas" color="inherit" underline="none"><Typography>Peliculas</Typography></Link>
          <Link href="/reservas" color="inherit" underline="none"><Typography>Reservas</Typography></Link>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}