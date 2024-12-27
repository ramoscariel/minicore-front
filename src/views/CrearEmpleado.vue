<template>
    <h2>Crear Empleado</h2>
    <form @submit.prevent="crear">
        <label>
            Nombre
            <input v-model="nombre" type="text" required placeholder="Bob Esponja">
        </label>
        <label>
            Cedula
            <input v-model="cedula" type="text" minlength="10" required placeholder="1721325492">
        </label>
        <button type="submit">Crear</button>
    </form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { createEmpleado } from '@/models/empleado';

const router = useRouter();

const nombre = ref('');
const cedula = ref('');

const crear = async () => {
    if (nombre.value.trim() === '' || cedula.value.trim() === '') {
        alert('Los campos no pueden estar vacíos')
        return
    }
    await createEmpleado(nombre.value,cedula.value)
    nombre.value='';
    cedula.value='';

    router.push('/');
};
</script>