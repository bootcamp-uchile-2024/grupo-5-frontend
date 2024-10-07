import styles from "./sidebar.module.css";

export const Sidebar = () => {  

  return (
    <div className={styles.sidebar}>
      <ul className={styles.sidebarMenu}>
        <li className={styles.sidebarHeader}>
          <h2>Menu</h2>
        </li>
        <li className={styles.sidebarItem}>
          <a href="#">Enlace 1</a>
        </li>
        <li className={styles.sidebarItem}>
          <a href="#">Enlace 2</a>
        </li>
        <li className={styles.sidebarItem}>
          <a href="#">Enlace 3</a>
        </li>
      </ul>
    </div>
  );
};
