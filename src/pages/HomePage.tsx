import { MainLayout } from "../layout/MainLayout";
import styles from "./css/HomePage.module.css";

export const HomePage = () => {
  return (
    <MainLayout>
    <div className={styles.HomePage} >
      <h1>Home</h1>
      <div className={styles.CardImg}>
        <div>
          <img
            src="https://t3.ftcdn.net/jpg/01/80/28/58/240_F_180285804_a050aAHqWKPKbnxiQ61k1d7zZuiRkzSA.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://t4.ftcdn.net/jpg/02/66/31/75/240_F_266317554_kr7DPOoM5Uty0YCeFU9nDZTt4a2LeMJF.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            src="https://as2.ftcdn.net/v2/jpg/00/74/15/95/1000_F_74159556_67n5823V7Ei87a4g6JJnYHC0yMSo1AEy.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
    </MainLayout>
  );
}
