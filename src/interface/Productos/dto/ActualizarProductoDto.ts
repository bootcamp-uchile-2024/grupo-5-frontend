
export interface ActualizarProductoDto{
    nombreProducto: string;
    idMarca: number;
    descripcion: string;
    sku: string;
    precio: number;
    stock: number;
    peso: string;
    tamanio: string;
    ingredientes: string;
    material: string;
    imagenes: string[];
    idCategoria: number;
    activo: number;
}