export const fetchComunaById = async (idComuna: number) => {
  try {
    const response = await fetch(
      `http://107.21.145.167:5001/comuna/${idComuna}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.nombreComuna;
  } catch (error) {
    console.error("Error al obtener la comuna:", error);
    return "";
  }
};
