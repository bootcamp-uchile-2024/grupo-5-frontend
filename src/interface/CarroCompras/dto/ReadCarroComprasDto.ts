import { DetalleCarroCompra } from "../DetalleCarroCompra";

export interface ReadCarroComprasDto{
    idCarroCompra: number;
    fechaCreacion: Date;
    precioTotal: number;
    idUsuario: number;
    detalleCarro: DetalleCarroCompra[];
}