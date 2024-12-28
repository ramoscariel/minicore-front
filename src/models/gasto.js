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

// crear gasto
export const createGasto = async (
  idEmpleado,
  idDepartamento,
  description,
  amount
) => {
  try {
    const response = await axios.post(gastoUrl, {
      id_empleado: idEmpleado,
      id_departamento: idDepartamento,
      descripcion: description,
      monto: amount,
    });
    return response.data;
  } catch (error) {
    alert("Error, no se pudo crear gasto");
    return {};
  }
};

// actualizar gasto
export const updateGasto = async (id,idEmpleado,idDepartamento,date,description,amount) => {
  try {
    const response = await axios.put(`${gastoUrl}/${id}`, {
      id_empleado: idEmpleado,
      id_departamento: idDepartamento,
      fecha:date,
      descripcion:description,
      monto:amount,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data)
    throw error;
  }
};


// borrar gasto
export const deleteGasto = async (id) => {
  try {
    const response = await axios.delete(`${gastoUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
