import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CatalogoProductos from "./pages/CatalogoProductos";
import { LoginPage } from "./pages/LoginPage";
import DetalleProductos from "./pages/DetalleProductos";
import "./index.css";
import { PrivateRoute } from "./components/PrivateRoute";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="home" element={<PrivateRoute roles={["user"]}><HomePage /></PrivateRoute>} />
          <Route path="about" element={<AboutPage />} />
          <Route path="catalogo-productos" element={<CatalogoProductos />} />
          <Route path="detalle-productos/:id" element={<DetalleProductos />} />
          <Route path="admin" element={<PrivateRoute roles={["admin"]}><AdminPage /></PrivateRoute>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
