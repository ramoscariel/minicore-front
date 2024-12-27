import baseUrl from "@/config/backend";
import axios from "axios";

const departamentoUrl = `${baseUrl}/departamento`;

export const getAllDepartamentos = async () => {
  try {
    const response = await axios.get(departamentoUrl);
    return response.data;
  } catch (error) {
    return [];
  }
};

// get departamento
export const getDepartamento = async (id) => {
  try {
    const response = await axios.get(`${departamentoUrl}/${id}`);
    return response.data;
  } catch (error) {
    return {};
  }
};

// crear departamento
export const createDepartamento = async (nombre) => {
  try {
    const response = await axios.post(departamentoUrl, {
      nombre_departamento: nombre,
    });
    return response.data;
  } catch (error) {
    alert("Error, no se pudo crear departamento");
    return {};
  }
};

// actualizar departamento
export const updateDepartamento = async (id,nombre) => {
  try {
    const response = await axios.put(`${departamentoUrl}/${id}`, {
      id_departamento: id,
      nombre_departamento: nombre,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// borrar departamento
export const deleteDepartamento =  async(id) =>{
  try{
    const response = await axios.delete(`${departamentoUrl}/${id}`);
    return response.data;
  }catch(error){
    throw error;
  }
}
