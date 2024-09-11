import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import { CatalogoProductos } from "./pages/CatalogoProductos";
import { LoginPage } from "./pages/LoginPage";
import Registro from "./pages/Registro";
import DetalleProductos from "./pages/DetalleProductos";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="catalogo-productos" element={<CatalogoProductos />} />
          <Route path="detalle-productos:id" element={<DetalleProductos />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registro" element={<Registro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
