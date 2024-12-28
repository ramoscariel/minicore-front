<template>
    <h2>Crear Gasto</h2>
    <form @submit.prevent="crear">
        <label>
            Departamento
            <select>
                <option v-for="departamento in departamentos"
                    @click="onClickDepartamento(departamento.id_departamento)">
                    {{ departamento.nombre_departamento }}
                </option>
            </select>
        </label>
        <label>
            Empleado (Cedula)
            <select>
                <option v-for="empleado in empleados" @click="onClickEmpleado(empleado.id_empleado)">{{
                    empleado.cedula }}</option>
            </select>
        </label>
        <label>
            Descripcion
            <input v-model="descripcion" type="text" required>
        </label>
        <label>
            Monto
            <input v-model="monto" type="number" required min="0">
        </label>
        <button type="submit">Crear</button>
    </form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getAllEmpleados } from '@/models/empleado';
import { getAllDepartamentos } from '@/models/departamento';
import { createGasto } from '@/models/gasto';

const router = useRouter();

const departamentos = ref([]);
const empleados = ref([]);

const descripcion = ref('');
const monto = ref('');

let selectedDepartamentoId = null;
let selectedEmpleadoId = null;

const crear = async () => {
    await createGasto(selectedEmpleadoId,selectedDepartamentoId,descripcion.value,monto.value)
    router.push('/');
};

const onClickDepartamento = (id) => {
    selectedDepartamentoId = id;
}

const onClickEmpleado = (id) => {
    selectedEmpleadoId = id;
}

onMounted(async () => {
    departamentos.value = await getAllDepartamentos();
    empleados.value = await getAllEmpleados();

    selectedDepartamentoId = departamentos.value[0].id_departamento;
    selectedEmpleadoId = empleados.value[0].id_empleado;

    console.log(selectedDepartamentoId,selectedEmpleadoId)
})
</script>