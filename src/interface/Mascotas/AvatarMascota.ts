import { Mascota } from "./Mascota";

export interface AvatarMascota{
    idAvatarMascota: number;
    pathImagenMascota: string;
    mascotas: Mascota[];
}