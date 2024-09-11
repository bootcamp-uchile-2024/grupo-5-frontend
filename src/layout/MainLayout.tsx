import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/footer";
import "../index.css";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <Header />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
