import { Producto } from "../Productos/Producto";
import { Usuario } from "../Usuarios/Usuario";
import { DetallesPedidos } from "./DetallesPedidos";

export interface Pedido{
    idPedido: number;
    fechaCreacion: Date;
    fechaEntrega: Date;
    precioTotal: number;
    usuario: Usuario;
    detallePedido: DetallesPedidos[];
    producto: Producto[]; 
}