export interface MascotaDto{
    rutUsuario: string;
    idMascota: number;
    nombre: string;
    categoria: string;
    raza: string;
    edad: number;
    imagen?: string;
    afeccionesSalud?: string[];
    preferencias?: string[];
}