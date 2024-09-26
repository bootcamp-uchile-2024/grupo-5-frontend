import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const auth = isAuth();

  return <>{auth ? props.children : <h1>Acceso denegado</h1>}</>;
};

const isAuth = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};
