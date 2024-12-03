import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CatalogoProductos } from "./pages/CatalogoProductos";
import {LoginPage} from "./pages/LoginPage";
import { DetalleProductos } from "./pages/DetalleProductos";
import { PrivateRoute } from "./layout/protected/PrivateRoute";
import { ResumenPage } from "./pages/ResumenPage";
import { AdminPage } from "./pages/AdminPage";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { DashboardPage } from "./pages/DashboardPage";
import { Provider } from "react-redux";
import { store } from "./states/store";
import { GestionUsuarios } from "./pages/GestionUsuarios";
import { GestionProductos } from "./pages/GestionProductos";
import { CategoriaPerros } from "./pages/CategoriaPerros";
import { AlimentosPerros } from "./pages/AlimentosPerros";
import { RegistrodeUsuario } from "./pages/RegistrodeUsuario";
import { RegistroInvitado } from "./pages/RegistroInvitado";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/users" element={<GestionUsuarios />} />
          <Route path="/products" element={<GestionProductos />} />
          <Route path="/catalogo-productos" element={<CatalogoProductos />} />
          <Route path="/detalle-productos/:id" element={<DetalleProductos />} />
          <Route path="/carrito" element={<ResumenPage />} />
          <Route path="/categoria-perro" element={<CategoriaPerros />} />
          <Route path="/alimentos-perro" element={<AlimentosPerros />} />
          <Route path="/registro" element={<RegistrodeUsuario />} />
          <Route path="/registro-invitado" element={<RegistroInvitado />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={["user", "admin"]}>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<div>Contenido general del dashboard</div>} />
            <Route
              path="detalle"
              element={<div>Contenido detalle del dashboard</div>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
