<template>
    <h2>Empleados</h2>
    <RouterLink to="/crearEmpleado">Crear</RouterLink> 
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>cedula</th>
                <th>nombre</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ id_empleado, nombre_empleado, cedula } in empleados">
                <th>{{ id_empleado }}</th>
                <td>{{ cedula }}</td>
                <td>{{ nombre_empleado }}</td>
                <td><RouterLink :to="`/actualizarEmpleado/${id_empleado}`">Actualizar</RouterLink></td>
                <td><button @click="onBorrar(1,id_empleado)">Borrar</button></td>
            </tr>
        </tbody>
    </table>
    <h2>Departamentos</h2>
    <RouterLink to="/crearDepartamento">Crear</RouterLink> 
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>nombre</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ id_departamento, nombre_departamento } in departamentos">
                <th>{{ id_departamento }}</th>
                <td>{{ nombre_departamento }}</td>
                <td><RouterLink :to="`/actualizarDepartamento/${id_departamento}`">Actualizar</RouterLink></td>
                <td><button @click="onBorrar(2,id_departamento)">Borrar</button></td>
            </tr>
        </tbody>
    </table>
    <h2>Gastos</h2>
    <RouterLink to="/crearGasto">Crear</RouterLink> 
    <table>
        <thead>
            <tr>
                <th>id_gasto</th>
                <th>id_empleado</th>
                <th>id_departamento</th>
                <th>fecha</th>
                <th>descripcion</th>
                <th>monto</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="gasto in gastos">
                <th>{{ gasto.id_gasto }}</th>
                <td>{{ gasto.id_empleado }}</td>
                <td>{{ gasto.id_departamento }}</td>
                <td>{{ formatDate(gasto.fecha) }}</td>
                <td>{{ gasto.descripcion }}</td>
                <td>{{ gasto.monto }}</td>
                <td><RouterLink :to="`/actualizarGasto/${gasto.id_gasto}`">Actualizar</RouterLink></td>
                <td><button @click="onBorrar(3,gasto.id_gasto)">Borrar</button></td>
            </tr>
        </tbody>
    </table>
    <h2>Total Gastos por Departamento</h2>
    <label>
        Fecha Inicio
        <input v-model="fechaInicio" type="date" @change="onDateSet"> <!--@change (when field is set)-->
    </label>
    <label>
        Fecha Fin
        <input v-model="fechaFin" type="date" @change="onDateSet">
    </label>
    <table>
        <thead>
            <tr>
                <th>departamento</th>
                <th>total</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ nombre_departamento, total } in totalGastos">
                <th>{{ nombre_departamento }}</th>
                <td>{{ total }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllEmpleados, deleteEmpleado } from '../models/empleado';
import { getAllDepartamentos, deleteDepartamento } from '../models/departamento';
import { getAllGastos, getTotalGastos, deleteGasto } from '../models/gasto';


const empleados = ref([]);
const departamentos = ref([]);
const gastos = ref([]);
const totalGastos = ref([]);
const fechaInicio = ref('2024-01-01');
const fechaFin = ref('2024-12-31');


const onDateSet = async () => {
    totalGastos.value = await getTotalGastos(fechaInicio.value, fechaFin.value);
}

const onBorrar = async (tipo, id) => {
    // empleado (1)
    if(tipo===1){
        try{
            await deleteEmpleado(id)
            empleados.value = await getAllEmpleados();
        }catch{
            alert('Error eliminando empleado');
        }
    }
    else if(tipo===2){
        try{
            await deleteDepartamento(id)
            departamentos.value = await getAllDepartamentos();
        }catch{
            alert('Error eliminando departamento');
        }
    }
    else if(tipo===3){
        try{
            await deleteGasto(id)
            gastos.value = await getAllGastos();
            totalGastos.value = await getTotalGastos(fechaInicio.value, fechaFin.value);
        }catch{
            alert('Error eliminando gasto');
        }
    }
}

const formatDate = (date) => {
    return date.split("T")[0]; // Extracts 'YYYY-MM-DD'
}

onMounted(async () => {
    empleados.value = await getAllEmpleados();
    departamentos.value = await getAllDepartamentos();
    gastos.value = await getAllGastos();
    totalGastos.value = await getTotalGastos(fechaInicio.value, fechaFin.value);
})
</script>

<style>
th,
td {
    border-right: 1px solid black;
}
</style>