import { Mascota } from "./Mascota";

export interface Vacuna{
    idVacuna: number;
    nombreVacuna: string;
    mascotas: Mascota[];
}