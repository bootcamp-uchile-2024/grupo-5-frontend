import { Producto } from "../Productos/Producto";

export interface ReadDetalleCarroCompraDto{
    idDetalleCarro: number;
    cantidad: number;
    precioUnitario: number;
    productos?: Producto[];
}