import { Especie } from "./Especie";
import { Mascota } from "./Mascota";

export interface Raza{
    idRaza: number;
    nombreRaza: string;
    mascotas: Mascota[];
    especie: Especie;
}