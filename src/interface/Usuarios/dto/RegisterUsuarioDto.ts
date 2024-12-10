export interface RegisterUsuarioDto{
    rutUsuario: string;
    contrasena: string;
    nombres: string;
    apellidos: string;
    correoElectronico: string;
    telefono: string;
    chkOfertas: boolean;
    chkTerminos: boolean;
}