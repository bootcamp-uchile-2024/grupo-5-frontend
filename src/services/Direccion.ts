export const getDireccion = async (idUsuario: number) => {
  const apiUrl = `${
    import.meta.env.VITE_API_URL
  }/direccion/direcciones/${idUsuario}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const direccion = await response.json();
    const direccionArray = Array.isArray(direccion) ? direccion : [direccion];
    return direccionArray;
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
    return [];
  }
};

export const deleteDireccion = async (idDireccion: number) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/direccion/${idDireccion}`;
  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error al eliminar la dirección:", error);
    return false;
  }
};

export const editarDireccion = async (idDireccion: number, formState: any) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/direccion/${idDireccion}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error al actualizar la dirección:", error);
    return false;
  }
};
