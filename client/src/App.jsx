import NavDrawer from "./components/NavDrawer/NavDrawer"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";
import CrearCotizacion from "./pages/Cotizaciones/CrearCotizacion/CrearCotizacion";
import MisCotizaciones from "./pages/Cotizaciones/MisCotizaciones/MisCotizaciones";
import RegistrarEmpresa from "./pages/Empresas/RegistrarEmpresa/RegistrarEmpresa"
import ListaDeEmpresas from "./pages/Empresas/ListaDeEmpresas/ListaDeEmpresas"
import CrearUsuario from "./pages/Empresas/CrearUsuario/CrearUsuario"
import Configuracion from "./pages/Configuracion/Configuracion"
import { ScrollRestoration } from "react-router-dom";




function App() {
  

  return (
    <>
    <BrowserRouter>
     <NavDrawer />
     
     <Routes>
      <Route path="/" element={<Inicio />}/>
      <Route path="/crearcotizacion" element={<CrearCotizacion />}/>
      <Route path="/miscotizaciones" element={<MisCotizaciones />}/>
      <Route path="/registrarcliente" element={<RegistrarEmpresa />}/>
      <Route path="/listaclientes" element={<ListaDeEmpresas />}/>
      <Route path="/crearusuario" element={<CrearUsuario/>}/>
      <Route path="/configuracion" element={<Configuracion />}/>
     </Routes>
     
     </BrowserRouter>
     
    </>
    
  )
}

export default App
