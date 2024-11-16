export interface GetProductoDto {
    id: number;
    nombreProducto: string;
    marca: string;
    descripcion: string;
    sku: string;
    precio: number;
    stock: number;
    peso: string;
    tamanio: string;
    ingredientes: string;
    imagenes: ImagenProducto[];
    material: string;
    categoria: string;
  }

  export interface ImagenProducto {
    idImagen: number;
    pathImagenProducto: string;
}