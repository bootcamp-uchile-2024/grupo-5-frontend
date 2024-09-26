import React, { useState } from "react";
import { CreateProductoDto } from "../interface/CreateProductoDTO";
import '../css/formulario.css';

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
    console.log(producto);
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-registro-producto">
      <div className="form-group">
        <label htmlFor="nombre">Nombre del Producto</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="marca">Marca</label>
        <input
          type="text"
          id="marca"
          name="marca"
          value={producto.marca}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn-submit">Registrar Producto</button>
    </form>
  );
};

export default FormularioRegistroProducto;