import { ImagenProducto } from "../ImagenProducto";

export interface GetProductoDto {
    id: number;
    sku: string;
    nombreProducto: string;
    marcaProducto: string;    
    precioProducto: number;
    stockProducto: number; 
    descripcionProducto: string;
    pesoProducto: string;
    tamanioProducto: string;
    ingredientesProducto: string;
    materialProducto: string;
    imagenesProducto: ImagenProducto[];   
    categoriaProducto: string;
    activo: number;
  }