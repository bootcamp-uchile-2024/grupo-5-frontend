import Header from "../components/Header";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import Homepage from "../pages/HomePage";
import Footer from "../components/footer";

import "../index.css";
import "./MainLayout.css";
export function MainLayout() {
  return (
    <>
      <Header />
      <Nav />
      <div className="main-container">
        <Sidebar />
        <Homepage />
      </div>
      <Footer />
      
    </>
  );
}
