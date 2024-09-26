import { ReactNode } from "react";
import { isAuth, userHasRole } from "../services/loginService";

interface PrivateRouteProps {
  children: ReactNode;
  roles: string[];
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const auth = isAuth();
  const hasRole = userHasRole(props.roles);

  return <>{auth && hasRole ? props.children : <h1>Acceso denegado</h1>}</>;
};


