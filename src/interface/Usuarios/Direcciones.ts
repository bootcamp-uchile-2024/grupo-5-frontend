import { Comuna } from "./Comuna";
import { Usuario } from "./Usuario";

export interface Direcciones{
    idDireccion: number;
    idUsuario: number;
    idComuna: number;
    alias: string;
    calle: string;
    numero: string;
    zipCode: number;
    referencias: string;
    personaContacto: string;
    telefonoContacto: number;
    usuario: Usuario;
    comuna: Comuna;
}