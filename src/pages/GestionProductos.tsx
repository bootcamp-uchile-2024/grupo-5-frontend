import { useEffect, useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import Table from "react-bootstrap/Table";

export const GestionProductos = () => {
  interface Product {
    id: number;
    NombreProducto: string;
    PrecioProducto: number;
    descripcion: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    throw new Error(
      "La URL de la API no está definida en las variables de entorno"
    );
  }

  const fetchProducts = async () => {
    const response = await fetch(`${apiUrl}/productos/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }

    const data = await response.json();
    console.log("Productos obtenidos de la API:", data);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MainLayout>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.NombreProducto}</td>
              <td>{product.PrecioProducto}</td>
              <td>{product.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </MainLayout>
  );
};
