import baseUrl from "@/config/backend";
import axios from "axios";

const gastoUrl = `${baseUrl}/gasto`;

export const getAllGastos = async () => {
  try {
    const response = await axios.get(gastoUrl);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getTotalGastos = async (start, end) => {
  try {
    const response = await axios.get(`${gastoUrl}/total`, {
      params: {
        fechaInicio: start,
        fechaFin: end,
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};

// get gasto
export const getGasto = async (id) => {
  try {
    const response = await axios.get(`${gastoUrl}/${id}`);
    return response.data;
  } catch (error) {
    return {};
  }
};
