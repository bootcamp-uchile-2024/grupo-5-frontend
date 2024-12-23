import { Mascota } from "./Mascota";

export interface RegistroMedico{
    idRegistroMedico: number;
    fechaRegistro: Date;
    horaRegistro: Date;
    motivo: string;
    mascota: Mascota;
}