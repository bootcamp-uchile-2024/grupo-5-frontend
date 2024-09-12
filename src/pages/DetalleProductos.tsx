import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreateProductoDto } from "../interface/CreateProductoDTO";

const DetalleProductos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<CreateProductoDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducto = async () => {
      try {
        if (!id) return;

        const response = await fetch(`/api/productos/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        let responseText = await response.text();
        console.log("Raw response:", responseText);

        try {
          const productoJson = JSON.parse(responseText);
          setProducto(productoJson);
        } catch (jsonError) {
          if (jsonError instanceof Error) {
            throw new Error(`Error parsing JSON: ${jsonError.message}`);
          } else {
            throw new Error("Error parsing JSON: Unknown error");
          }
        }
      } catch (error: any) {
        console.log("Ocurrió un error al obtener el producto:", error);
        setError(`Error al obtener el producto: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    getProducto();
  }, [id]);

  if (loading) return <div>Cargando producto...</div>; // Mostrar loading
  if (error) return <div>{error}</div>; // Mostrar error si ocurre

  return (
    <>
      <h1>Detalle del producto</h1>
      {producto && (
        <div className="producto-card">
          <h3>{producto.nombre}</h3>
          <img src={producto.imagenes[0]} alt={producto.nombre} width="300" />
          <p>Precio: ${producto.precio}</p>
          <p>Detalle: {producto.descripcion}</p>
        </div>
      )}
    </>
  );
};

export default DetalleProductos;
