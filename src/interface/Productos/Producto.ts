import { DetalleCarroCompra } from "../CarroCompras/DetalleCarroCompra";
import { DetallesPedidos } from "../CarroCompras/DetallesPedidos";
import { CategoriaProducto } from "./CategoriaProducto";
import { ImagenProducto } from "./ImagenProducto";
import { MarcaProducto } from "./MarcaProducto";

export interface Producto{
    idProducto: number;
    nombreProducto: string;
    descripcion: string;
    sku: string;
    precio: number;
    stock: number;
    peso: string;
    tamanio: string;
    ingredientes: string;
    material: string;
    activo: number;
    descuento: number;
    categoria: CategoriaProducto;
    marca: MarcaProducto;
    imagenes: ImagenProducto[];
    detalleCarroCompra: DetalleCarroCompra[];
    detallePedido: DetallesPedidos;
  }