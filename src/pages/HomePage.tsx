import { CarouselHome } from "../components/CarouselHome";
import { MainLayout } from "../layout/MainLayout";
import styles from "./css/HomePage.module.css";

export const HomePage = () => {
  return (
    <MainLayout>
    <div className={styles.HomePage} >
      <CarouselHome />
    </div>
    </MainLayout>
  );
}
