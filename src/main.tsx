import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CatalogoProductos } from "./pages/CatalogoProductos";
import { LoginPage } from "./pages/LoginPage";
import { DetalleProductos } from "./pages/DetalleProductos";
import { PrivateRoute } from "./layout/protected/PrivateRoute";
import { AdminPage } from "./pages/AdminPage";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { DashboardPage } from "./pages/DashboardPage";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login"element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/catalogo-productos" element={<CatalogoProductos />} />
        <Route path="/detalle-productos/:id" element={<DetalleProductos />} />
        <Route path="/admin" element={<PrivateRoute roles={["admin"]}><AdminPage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute roles={["user", "admin"]}><DashboardPage /></PrivateRoute>}>
          <Route index element={<div>Contenido general del dashboard</div>} />
          <Route path="detalle" element={<div>Contenido detalle del dashboard</div>} />
        </Route>       
      </Routes>
    </BrowserRouter>  
  </StrictMode>,
)
