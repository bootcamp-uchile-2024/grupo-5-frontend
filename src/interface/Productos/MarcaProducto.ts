import { Producto } from "./Producto";

export interface MarcaProducto{
    idMarca: number; 
    nombreMarca: string;
    productos: Producto[];
}