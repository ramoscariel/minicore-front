<template>
    <h2>Crear Departamento</h2>
    <form @submit.prevent="crear">
        <label>
            Nombre
            <input v-model="nombre" type="text" required placeholder="Dep. of Awesome">
        </label>
        <button type="submit">Crear</button>
    </form>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { createDepartamento } from '@/models/departamento';

const router = useRouter();

const nombre = ref('');

const crear = async () => {
    if (nombre.value.trim() === '') {
        alert('Los campos no pueden estar vacíos')
        return
    }
    await createDepartamento(nombre.value)
    nombre.value='';

    router.push('/');
};
</script>