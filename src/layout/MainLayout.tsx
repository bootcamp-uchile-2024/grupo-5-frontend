import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
// import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import styles from "./MainLayout.module.css";
interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
    console.log(`Mi endpoint es: ${import.meta.env.VITE_URL_ENDPOINT_BACKEND}`);
    return (
        <div className={styles.mainLayout}>
            <Header />
            <Navbar />   
            <div className={styles.container}>
              {/* <Sidebar /> */}
              <main className={styles.main}>
                  {props.children}
              </main>
            </div>
            <Footer />
        </div>
    )
};
