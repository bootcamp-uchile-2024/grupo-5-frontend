export interface UsuarioDto{
    idUsuario: number;
    rut: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    contrasena: string;
    chkTerminos: boolean;
    chkOfertas: boolean;
    activo: boolean;
    avatar: number;  
}