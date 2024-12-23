import { ImagenProducto } from "../ImagenProducto";

export interface CatalogoProductoDto{
    id: number;
    sku: string;
    nombreProducto: string;
    marcaProducto: string;
    precioProducto: number;
    stockProducto: number;
    imagenesProducto: ImagenProducto[];
}