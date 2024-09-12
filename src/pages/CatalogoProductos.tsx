import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateProductoDto } from "../interface/CreateProductoDTO";

const CatalogoProductos: React.FC = () => {
  const [productos, setProductos] = useState<CreateProductoDto[]>([]);

  useEffect(() => {
    async function getProductos() {
      try {
        const response = await fetch("/api/productos");

        if (!response.ok) {
          console.log("No pudimos obtener los productos");
        }
        const productosJson = await response.json();
        console.log(productosJson);
        setProductos(productosJson);
      } catch (error) {
        console.log("Ocurrio un error al obtener los productos");
      }
    }

    getProductos();
  }, []);

  return (
    <>
      <h1>Catalogo de Productos</h1>
      <br />
      <div className="producto-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagenes[0]} alt={producto.nombre} width="100" />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <Link to={`/detalle-productos/${producto.id}`}>Ver Detalle</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CatalogoProductos;
