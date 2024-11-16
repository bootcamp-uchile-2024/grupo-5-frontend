import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../layout/MainLayout";
import Table from "react-bootstrap/Table";
import { GetProductoDto } from "../states/ProductSlice";
import { RootState } from "../states/store";

export const GestionProductos = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  const fetchProducts = async () => {
    const response = await fetch("/api/productos", {
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
    dispatch({ type: "products/setProducts", payload: data });
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    console.log("Productos en el estado de Redux:", products);
  }, [products]);

  return (
    <MainLayout>
      <div className="container mt-4">
        <h2>Gestión de Productos</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Nombre del Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: GetProductoDto) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombreProducto}</td>
                <td>{product.descripcion}</td>
                <td>{product.precio}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </MainLayout>
  );
};
