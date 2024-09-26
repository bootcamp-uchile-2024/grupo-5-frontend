import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CatalogoProductos from "./pages/CatalogoProductos";
import { LoginPage } from "./pages/LoginPage";
import DetalleProductos from "./pages/DetalleProductos";
import "./index.css";
import { PrivateRoute } from "./components/PrivateRoute";
import RegistroUsuario from "./pages/RegistroUsuario";
import RegistroProducto from "./pages/RegistroProducto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="catalogo-productos" element={<CatalogoProductos />} />
          <Route path="detalle-productos/:id" element={<DetalleProductos />} />
          {/* <Route path="login" element={<LoginPage />} /> */}
          <Route
            path="registro-usuario"
            element={
              <PrivateRoute>
                <RegistroUsuario />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="registro-producto" element={<RegistroProducto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
