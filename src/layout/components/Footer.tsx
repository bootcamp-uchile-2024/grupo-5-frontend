import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faWhatsapp, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import "./Footer.module.css";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className= {styles.footerContainer}>
        <div className={styles.footerColumns}>
          {/* Columna de logotipo y enlaces principales */}
          <div className={styles.footerColumn}>
            <h5 className={styles.footerTitle}>PETROPOLIS</h5>
            <ul className={styles.footerList}>
              <li><a href="#!">Blog</a></li>
              <li><a href="#!">Trabaja con Nosotros</a></li>
            </ul>
          </div>

          {/* Columna Título */}
          <div className={styles.footerColumn}>
            <h5 className={styles.footerTitle}>Título</h5>
            <ul className={styles.footerList}>
              <li><a href="#!">Blog</a></li>
              <li><a href="#!">Trabaja con Nosotros</a></li>
            </ul>
          </div>

          {/* Columna Mi cuenta */}
          <div className={styles.footerColumn}>
            <h5 className={styles.footerTitle}>Mi cuenta</h5>
            <ul className={styles.footerList}>
              <li><a href="#!">Perfil</a></li>
              <li><a href="#!">Mis pedidos</a></li>
              <li><a href="#!">Mis Mascotas</a></li>
            </ul>
          </div>

          {/* Columna Guía de compra */}
          <div className={styles.footerColumn}>
            <h5 className={styles.footerTitle}>Guía de compra</h5>
            <ul className={styles.footerList}>
              <li><a href="#!">Información</a></li>
              <li><a href="#!">Términos y condiciones</a></li>
              <li><a href="#!">Preguntas frecuentes</a></li>
            </ul>
          </div>

          {/* Columna Guía de compra */}
          <div className={styles.footerColumn}>
            <h5 className={styles.footerTitle}>¡Siguénos!</h5>
              <div className={styles.footerIcons}>          
                <a href="#!"><FontAwesomeIcon icon={faInstagram}/></a>
                <a href="#!"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="#!"><FontAwesomeIcon icon={faXTwitter} /></a>
                <a href="#!"><FontAwesomeIcon icon={faLinkedin} /></a>
              </div>
          </div>
        </div>
      </div>    
    </footer>
  );
};
