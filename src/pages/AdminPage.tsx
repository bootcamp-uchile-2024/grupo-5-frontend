import FormularioRegistroUsuario from '../components/FormularioRegistroUsuario';
import FormularioRegistroProducto from '../components/FormularioRegistroProducto';
import { MainLayout } from '../layout/MainLayout';
import styles from './css/AdminPage.module.css';

export const AdminPage = () => {
  return (
    <MainLayout>
    <div className= {styles.adminPage}>
      <div className= {styles.content}>
          <h1>Usuario Administrador</h1>
        <div className= {styles.formsWrapper}>
          <div className={styles.formContainer}>
            <h2>Registro de Usuario</h2>
            <FormularioRegistroUsuario />
          </div>
          <div className={styles.formContainer}>
            <h2>Registro de Producto</h2>
            <FormularioRegistroProducto />
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};