import { Producto } from "./Producto";

export interface CategoriaProducto {
    idCategoria: number; 
    nombreCategoria: string;
    descripcionCategoria: string;
    productos: Producto[];
  }