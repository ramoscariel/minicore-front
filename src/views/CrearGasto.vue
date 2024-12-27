<template>
    <h2>Crear Gasto</h2>
    <form @submit.prevent="crear">
        <label>
            Departamento
            <select>
                <option v-for="departamento in departamentos" :value="departamento.nombre_departamento">{{
                    departamento.nombre_departamento }}</option>
            </select>
        </label>
        <label>
            Empleado (Cedula)
            <select>
                <option v-for="empleado in empleados" :value="empleado.cedula">{{
                    empleado.cedula }}</option>
            </select>
        </label>
        <label>
            Fecha
            <input type="date" required>
        </label>
        <label>
            Descripcion
            <input type="text" required>
        </label>
        <label>
            Monto
            <input type="number" required>
        </label>
        <button type="submit">Crear</button>
    </form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getAllEmpleados } from '@/models/empleado';
import { getAllDepartamentos } from '@/models/departamento';

const router = useRouter();

const departamentos = ref([]);
const empleados = ref([]);

const crear = async () => {

    router.push('/');
};

onMounted(async () => {
    departamentos.value = await getAllDepartamentos();
    empleados.value = await getAllEmpleados();
})
</script>