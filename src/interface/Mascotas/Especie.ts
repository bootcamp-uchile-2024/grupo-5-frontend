import { Raza } from "./Raza";

export interface Especie{
    idEspecie: number;
    nombreEspecie: string;
    razas: Raza[];
}