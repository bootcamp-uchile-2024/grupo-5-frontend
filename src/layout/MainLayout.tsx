import Header from "../components/Header";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import Homepage from "../pages/HomePage";
import Footer from "../components/footer";
// import FormularioRegistroUsuario from "../components/FormularioRegistroUsuario";
// import FormularioRegistroMascota from "../components/FormularioRegistroMascota";
// import FormularioRegistroProducto from "../components/FormularioRegistroProducto";
import "../index.css";
import "./MainLayout.css";
export default function MainLayout() {
  return (
    <>
      <Header />
      <Nav />
      <div className="main-container">
        <Sidebar />
        <Homepage />
      </div>
      <Footer />
      {/* <FormularioRegistroUsuario />
      <FormularioRegistroMascota />
      <FormularioRegistroProducto /> */}
    </>
  );
}
