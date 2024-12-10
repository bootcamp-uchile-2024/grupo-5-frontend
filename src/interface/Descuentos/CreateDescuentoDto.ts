export interface CreateDescuentoDto{
    nombreDescuento: string;
    descripcionDescuento: string;
    porcentajeDescuento: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: number;
}