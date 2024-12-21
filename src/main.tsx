import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { CatalogoProductos } from "./pages/CatalogoProductos";
import { LoginPage } from "./pages/LoginPage";
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
// import { GestionUsuarios } from "./pages/GestionUsuarios";
import { GestionProductos } from "./pages/GestionProductos";
import { CategoriaPerros } from "./pages/CategoriaPerros";
import { AlimentosPerros } from "./pages/AlimentosPerros";
import { RegistrodeUsuario } from "./pages/RegistrodeUsuario";
import { RegistroInvitado } from "./pages/RegistroInvitado";
import { PagoPage } from "./pages/PagoPage";
import { DireccionPage } from "./pages/DireccionPage";
import { PerfildeUsuario } from "./pages/PerfildeUsuario";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Rutas accesibles para todos los usuarios */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalogo-productos" element={<CatalogoProductos />} />
          <Route path="/detalle-productos/:id" element={<DetalleProductos />} />
          <Route path="/categoria-perro" element={<CategoriaPerros />} />
          <Route path="/alimentos-perro" element={<AlimentosPerros />} />
          <Route path="/registro" element={<RegistrodeUsuario />} />
          <Route path="/registro-invitado" element={<RegistroInvitado />} />
          <Route path="/resumen-carrito" element={<ResumenPage />} />
          <Route path="/pago" element={<PagoPage />}></Route>
          <Route path="/direccion" element={<DireccionPage />} />
          <Route path="/perfil-usuario" element={<PerfildeUsuario />} />
          {/* Rutas accesibles solo para usuarios registrados */}

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

          {/* Rutas accesibles solo para administradores */}

          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["admin"]}>
                <AdminPage />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/users"
            element={
              <PrivateRoute roles={["admin"]}>
                <GestionUsuarios />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/products"
            element={
              <PrivateRoute roles={["admin"]}>
                <GestionProductos />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
