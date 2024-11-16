import React, { useState } from "react";
import { CreateProductoDto } from "../interface/Productos/create-producto.dto";
import styles from "./css/formulario.module.css";

const FormularioRegistroProducto: React.FC = () => {
  const [producto, setProducto] = useState<CreateProductoDto>({
    nombre: "",
    marca: "",
    descripcion: "",
    precio: 0,
    imagenes: [],
    etiquetas: [],
    categoria: "",
    stock: 0,
    ingredientes: "",
    tamanio: "",
    origen: "",
    vidaUtil: "",
    recomendacionesUso: "",
    id: 0,
  });

  const [error, setError] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "etiquetas") {
      setProducto({ ...producto, [name]: value.split(",") });
    } else {
      setProducto({ ...producto, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !producto.nombre ||
      !producto.marca ||
      !producto.descripcion ||
      producto.precio <= 0
    ) {
      setError(true);
    } else {
      setError(false);
      console.log(producto);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formProductos}>
      <div className={styles.formGroup}>
        <label htmlFor="nombre">Nombre del Producto</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="marca">Marca</label>
        <input
          type="text"
          id="marca"
          name="marca"
          value={producto.marca}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className={styles.btnSubmit}>
        Registrar Producto
      </button>
      {error && <div>Faltan llegar algunos campos</div>}
    </form>
  );
};

export default FormularioRegistroProducto;
