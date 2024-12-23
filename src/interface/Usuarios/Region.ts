import { Comuna } from "./Comuna";

export interface Region{
    idRegion: number;
    orden: number;
    nombreRegion: string;
    comunas: Comuna[];
}