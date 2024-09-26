import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CreateProductoDto } from "../interface/CreateProductoDTO";
import "../index.css";

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
      } catch {
        console.log("Ocurrio un error al obtener los productos");
      }
    }

    getProductos();
  }, []);

  return (
    <>
      <div className="catalogo-container">
        <h1>Catalogo de Productos</h1>
        <br />
        <div className="producto-container">
          {productos.map((producto) => (
            <div key={producto.id} className="card-producto">
              <img
                src={producto.imagenes[0]}
                alt={producto.nombre}
                width="150"
              />
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <button className="btn-detalle">
                <Link
                  to={`/detalle-productos/${producto.id}`}
                  className="link-detalle"
                >
                  Ver Detalle
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CatalogoProductos;
