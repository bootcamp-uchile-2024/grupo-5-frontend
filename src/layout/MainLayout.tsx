import { Header } from '../components/Header';
import "../index.css";
import "../App.css";
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import Homepage from '../pages/HomePage';
import Footer from '../components/footer';

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
    </>
  )
}