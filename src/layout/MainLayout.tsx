import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
// import { Sidebar } from "./components/Sidebar";
import styles from "./MainLayout.module.css";
interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>{props.children}</main>
      </div>
      <Footer />
    </div>
  );
};
