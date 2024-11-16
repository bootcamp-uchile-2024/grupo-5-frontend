export interface ActualizarProductoDto{
    nombre: string;
    marca: string;
    descripcion: string;
    sku: string;
    precio: number;
    stock: number;
    peso: string;
    tamanio: string;
    ingredientes: string;
    imagenes: ImagenProducto[];
    categoria: string; 
}

export interface ImagenProducto {
    idImagen: number;
    pathImagenProducto: string;
  }