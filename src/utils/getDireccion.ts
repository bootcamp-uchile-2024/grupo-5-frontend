export const getDireccion = async (idUsuario: number) => {
  const apiUrl = `http://107.21.145.167:5001/direccion/${idUsuario}`;
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