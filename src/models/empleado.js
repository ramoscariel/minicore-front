import baseUrl from "@/config/backend";
import axios from "axios";

const empleadoUrl = `${baseUrl}/empleado`;

export const getAllEmpleados = async () => {
  try {
    const response = await axios.get(empleadoUrl);
    return response.data;
  } catch (error) {
    return [];
  }
};

// get empleado
export const getEmpleado = async (id) => {
  try {
    const response = await axios.get(`${empleadoUrl}/${id}`);
    return response.data;
  } catch (error) {
    return {};
  }
};

// crear empleado
export const createEmpleado = async (nombre, ced) => {
  try {
    const response = await axios.post(empleadoUrl, {
      nombre_empleado: nombre,
      cedula: ced,
    });
    return response.data;
  } catch (error) {
    alert("Error, no se pudo crear empleado");
    return {};
  }
};

// actualizar empleado
export const updateEmpleado = async (id,nombre,ced) => {
  try {
    const response = await axios.put(`${empleadoUrl}/${id}`, {
      id_empleado: id,
      nombre_empleado: nombre,
      cedula: ced,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// borrar empleado
export const deleteEmpleado =  async(id) =>{
  try{
    const response = await axios.delete(`${empleadoUrl}/${id}`);
    return response.data;
  }catch(error){
    throw error;
  }
}