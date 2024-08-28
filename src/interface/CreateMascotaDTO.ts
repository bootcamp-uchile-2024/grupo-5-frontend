export interface CreateMascotasDto{
    rutUsuario: string;
    nombre: string;
    edad: number;
    raza: string;
    imagen: string;
    afeccionesSalud: string[];
    preferencias: string[];
}