import React from 'react';
import FormularioRegistroUsuario from '../components/FormularioRegistroUsuario';
import FormularioRegistroProducto from '../components/FormularioRegistroProducto';
import { Sidebar } from '../components/Sidebar';
import '../index.css'; 

const AdminPage: React.FC = () => {
  return (
    <div className="admin-page">
      <Sidebar />
      <div className="content">
        <div className="title-container">
          <h1>Usuario Administrador</h1>
        </div>
        <div className="forms-wrapper">
          <div className="form-container">
            <h2>Registro de Usuario</h2>
            <FormularioRegistroUsuario />
          </div>
          <div className="form-container">
            <h2>Registro de Producto</h2>
            <FormularioRegistroProducto />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;