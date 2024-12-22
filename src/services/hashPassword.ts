const apiUrl = "http://107.21.145.167:5001/auth/hash";

export const hashPassword = async (
  password: string
): Promise<string | null> => {
  try {
    const response = await fetch(`${apiUrl}/${encodeURIComponent(password)}`, {
      method: "POST",
      headers: {
        accept: "*/*",
      },
      body: "", // Asegúrate de que el cuerpo de la solicitud esté vacío
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.text(); // Usa response.text() en lugar de response.json()
    return data; // Devuelve el texto directamente
  } catch (error) {
    console.error("Error al hashear la contraseña:", error);
    return null;
  }
};
