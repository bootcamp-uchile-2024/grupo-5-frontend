export interface UsuarioDto{
    rutUsuario: string;
    contrasena: string;
    nombre: string;
    apePaterno: string;
    apeMaterno: string;
    correoElectronico: string;
    telefono: string;
    rolUsuario: UserRole;

}

export enum UserRole {
    ADMINISTRADOR = 'Administrador',
    MANAGER = 'Manager',
    USUARIO = 'Usuario',
    INVITADO = 'Inivitado',
  }