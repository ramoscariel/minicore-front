<template>
    <h2>Actualizar Gasto</h2>
    <form @submit.prevent="actualizar">
        <label>
            Departamento
            <select v-model="selectedDepartamentoId">
                <option v-for="departamento in departamentos" :key="departamento.id_departamento"
                    :value="departamento.id_departamento">
                    {{ departamento.nombre_departamento }}
                </option>
            </select>
        </label>
        <label>
            Empleado (Cedula)
            <select v-model="selectedEmpleadoId">
                <option v-for="empleado in empleados" :key="empleado.id_empleado" :value="empleado.id_empleado">
                    {{ empleado.cedula }}
                </option>
            </select>
        </label>
        <label>
            Fecha
            <input v-model="fecha" type="date">
        </label>
        <label>
            Descripcion
            <input v-model="descripcion" type="text" required>
        </label>
        <label>
            Monto
            <input v-model="monto" type="number" required min="0">
        </label>
        <button type="submit">Actualizar</button>
    </form>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getAllEmpleados } from '@/models/empleado';
import { getAllDepartamentos } from '@/models/departamento';
import { getGasto, updateGasto } from '@/models/gasto';

const router = useRouter();
const route = useRoute();

const gastoId = route.params.id;

const departamentos = ref([]);
const empleados = ref([]);

const selectedDepartamentoId = ref(null);
const selectedEmpleadoId = ref(null);

const fecha = ref('');
const descripcion = ref('');
const monto = ref('');

const actualizar = async () => {
    // Ensure valid selections
    console.log(fecha.value)
    if (!selectedDepartamentoId.value || !selectedEmpleadoId.value) {
        alert('Por favor, selecciona un departamento y un empleado.');
        return;
    }
    try {
        await updateGasto(gastoId, selectedEmpleadoId.value,
            selectedDepartamentoId.value, fecha.value, descripcion.value, Number(monto.value))
    } catch {
        alert('No se pudo actualizar el gasto');
    }

    router.push('/');
};

onMounted(async () => {
    departamentos.value = await getAllDepartamentos();
    empleados.value = await getAllEmpleados();

    const gasto = await getGasto(gastoId);

    selectedDepartamentoId.value = gasto.id_departamento; // Set default
    selectedEmpleadoId.value = gasto.id_empleado;         // Set default

    // Format as YYYY-MM-DD
    fecha.value = new Date(gasto.fecha).toISOString().slice(0, 10);
    descripcion.value = gasto.descripcion;
    monto.value = gasto.monto;
});
</script>