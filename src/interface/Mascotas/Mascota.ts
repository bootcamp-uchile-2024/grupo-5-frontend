import { Usuario } from "../Usuarios/Usuario";
import { AvatarMascota } from "./AvatarMascota";
import { Raza } from "./Raza";
import { RegistroMedico } from "./RegistroMedico";
import { Vacuna } from "./Vacuna";

export interface Mascota{
    idMascota: number;
    nombre: string;
    fechaNacimiento: Date;
    sexo: string;
    numeroChip: string;
    registrosMedicos: RegistroMedico[];
    raza: Raza;
    avatarMascota: AvatarMascota;
    calendarios: Calendario[];
    condicionesAlimentarias: CondicionAlimentaria[];
    vacunas: Vacuna[];
    enfermedades: Enfermedad_Base[];
    usuarios: Usuario[];
}

export interface Calendario{
    idevento: number;
    fechaevento: Date;
    etiqueta: string;
    motivocalendario: string;
    idFrecuencia: Frecuencia;
    mascota: Mascota;
}

export interface Frecuencia{
    idFrecuencia: number;
    frecuencia: string;
    calendarios: Calendario[];
}

export interface CondicionAlimentaria{
    idCondicion: number;
    condicionalimentaria: string;
    mascotas: Mascota[];
}

export interface Enfermedad_Base{
    idEnfermedad: number;
    nombreEnfermedad: string;
    mascotas: Mascota[];
}