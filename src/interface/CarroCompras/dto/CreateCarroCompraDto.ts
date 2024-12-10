import { DetalleCarroCompra } from "../DetalleCarroCompra";

export interface CreateCarroCompraDto{
    fechaCreacion: Date;
    precioTotal: number;
    detallesCarro: DetalleCarroCompra[];
}
 