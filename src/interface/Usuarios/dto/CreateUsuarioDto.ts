export interface CreateUsuarioDto{
    idUsuario?: number; 
    rutUsuario: string;
    contrasena: string;
    nombre: string;
    apePaterno: string;
    apeMaterno: string;
    correoElectronico: string;
    telefono: string;
    rolUsuario: number;
    chkOfertas: boolean;
    chkTerminos: boolean; 
    activo: boolean; 
    idAvatar: number;
}