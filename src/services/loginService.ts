
interface ILogin {
  user: string;
  password: string;
  email: string;
  roles?: string[];
}

export function login(user: ILogin): boolean {
  if (user.user === "administrador" && user.password === "administrador") {
    const UserResponse: ILogin = {
      ...user,
      roles: ["admin", "user"],
    };

    const datosUsuario = JSON.stringify(UserResponse);
    localStorage.setItem("user", datosUsuario);

    return true;
  } else if (user.user === "usuario" && user.password === "usuario") {
    const UserResponse: ILogin = {
      ...user,
      roles: ["user"],
    };

    const datosUsuario = JSON.stringify(UserResponse);
    localStorage.setItem("user", datosUsuario);

    return true;
  } else {
    return false;
  }
}

export const logout = () => localStorage.removeItem('user');
export const isAuth = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

export const userHasRole = (roles: string[]) => {
    const user = localStorage.getItem('user');
    if (user) {
        const userResponse: ILogin = JSON.parse(user);
        return roles.some(role => userResponse.roles?.includes(role));
    }
    return false;
}
