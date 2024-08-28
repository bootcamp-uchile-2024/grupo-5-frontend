import React, { useState } from 'react';
import { CreateProductoDto } from '../interface/ICreateProductoDto';

const FormularioRegistroProducto: React.FC = () => {
  const [producto, setProducto] = useState<CreateProductoDto>({
    nombre: '',
    descripcion: '',
    precio: 0,
    etiquetas: [],
    stock: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre del Producto</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="descripcion">Descripción del Producto</label>
        <textarea
          name="descripcion"
          id="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="precio">Precio del Producto</label>
        <input
          type="number"
          name="precio"
          id="precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="etiquetas">Etiquetas del Producto (separadas por comas)</label>
        <input
          type="text"
          name="etiquetas"
          id="etiquetas"
          value={producto.etiquetas.join(",")}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="stock">Stock del Producto</label>
        <input
          type="number"
          name="stock"
          id="stock"
          value={producto.stock}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Registrar Producto</button>
    </form>
  );
};

export default FormularioRegistroProducto;
