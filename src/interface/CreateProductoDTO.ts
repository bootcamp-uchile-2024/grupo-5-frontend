export interface CreateProductoDto {
    nombre: string;
    marca: string;
    descripcion: string;
    precio: number;
    imagenes: string[];
    etiquetas: string[];
    categoria: string;
    stock: number;
    ingredientes: string;
    tamanio: string;
    origen: string;
    vidaUtil: string;
    recomendacionesUso: string;
    id: number;
  }
  