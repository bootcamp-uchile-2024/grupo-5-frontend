export interface CatalogoProductoDto{
    id: number;
    sku: string;
    NombreProducto: string;
    MarcaProducto: string;
    PrecioProducto: number;
    stock: number;
    ImagenesProducto: ImagenProducto[];
}
    
export interface ImagenProducto {
    idImagen: number;
    pathImagenProducto: string;
}