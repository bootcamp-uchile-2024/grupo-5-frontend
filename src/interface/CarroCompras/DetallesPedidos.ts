import { Producto } from "../Productos/Producto";
import { Pedido } from "./Pedido";

export interface DetallesPedidos{
    idDetallePedido: number;
    pedido: Pedido;
    producto: Producto;
    cantidadProducto: number;
    precioProducto: number;
}