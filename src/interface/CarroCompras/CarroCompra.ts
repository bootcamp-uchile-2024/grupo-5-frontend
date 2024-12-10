import { DetalleCarroCompra } from "./DetalleCarroCompra";

export interface CarroCompra {
    idCarroCompra: number;
    idUsuario: number;
    fechaCreacion: Date;
    precioTotal: number;
    detallesCarro: DetalleCarroCompra[];
  }