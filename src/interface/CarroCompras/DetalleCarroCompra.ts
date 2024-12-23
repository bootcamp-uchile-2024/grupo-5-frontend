import { CarroCompra } from "./CarroCompra";
import { Producto } from "../Productos/Producto";

export interface DetalleCarroCompra {
    idDetalleCarro: number;
    carroCompra: CarroCompra;
    producto: Producto;
    cantidad: number;
    precioUnitario: number;
  }