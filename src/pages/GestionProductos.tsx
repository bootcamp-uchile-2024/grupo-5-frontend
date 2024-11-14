import { useState, useEffect } from "react";
import { MainLayout } from "../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, ProductsWithId } from "../states/ProductSlice";
import { RootState } from "../states/store";

interface IForm {
  name: string;
}

export const GestionProductos = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);

  const [form, setForm] = useState<IForm>({
    name: "",
  });

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const addProductToAPI = async (product: IForm) => {
    const response = await fetch("/api/producto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("error al agregar producto");
    }

    return response.json();
  };

  const fetchProductsFromAPI = async (page: number, limit: number) => {
    const response = await fetch(`/api/producto?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("error al obtener productos");
    }

    return response.json();
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchProductsFromAPI(page, limit);
        dispatch(addProducts(data.products));
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (form.name === "") {
      alert("El campo nombre es obligatorio");
      return;
    }

    try {
      const newProduct = await addProductToAPI(form);
      dispatch(addProducts(newProduct));
      setForm({
        name: "",
      });
    } catch (error) {
      console.error("error al agregar producto:", error);
      alert("error al agregar producto");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <MainLayout>
      <h3>Gestión de Productos</h3>
      <form>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          onChange={handleChange}
          value={form.name}
        />
        <button type="button" onClick={handleSubmit}>
          Guardar
        </button>
      </form>
      <ul>
        {products.map((product: ProductsWithId) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
    </MainLayout>
  );
};

export default GestionProductos;
