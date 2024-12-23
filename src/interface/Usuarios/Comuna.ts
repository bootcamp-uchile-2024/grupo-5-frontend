import { Direcciones } from "./Direcciones";
import { Region } from "./Region";

export interface Comuna{
    idComuna: number;
    idRegion: number;
    nombreComuna: string;
    region: Region;
    direcciones: Direcciones[];
}