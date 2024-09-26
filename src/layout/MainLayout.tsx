import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import "../index.css";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
      <div className="main-layout">
      <Header />
      <Nav />
      <main className="contenedor-layout">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
