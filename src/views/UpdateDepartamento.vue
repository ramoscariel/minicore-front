<template>
    <h2>Actualizar Departamento</h2>
    <form @submit.prevent="update">
        <label>
            Nombre
            <input v-model="nombre" type="text" required>
        </label>
        <button type="submit">Actualizar</button>
    </form>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { getDepartamento, updateDepartamento } from '@/models/departamento';

const nombre = ref('');

const router = useRouter();

const route = useRoute();
const departamentoId = route.params.id;

const update = async() =>{
    try{
        await updateDepartamento(departamentoId,nombre.value);
        router.push('/');
    }
    catch{
        alert('Departamento no se pudo actualizar')
        initFields();
    }
};

const initFields = async () =>{
    const departamento = await getDepartamento(departamentoId);
    nombre.value = departamento.nombre_departamento;
}

onMounted(async () =>{
    initFields();
})
</script>