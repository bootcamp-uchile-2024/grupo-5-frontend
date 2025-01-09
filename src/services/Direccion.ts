export const getDireccion = async (idUsuario: number) => {
  try {
    const response = await fetch(
      `http://107.21.145.167:5001/direccion/direcciones/${idUsuario}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
    return [];
  }
};

export const addDireccion = async (direccion: any) => {
  try {
    const response = await fetch(`http://107.21.145.167:5001/direccion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(direccion),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al agregar la dirección:", error);
    return null;
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
