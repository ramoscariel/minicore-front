<template>
    <h2>Actualizar Empleado</h2>
    <form @submit.prevent="update">
        <label>
            Nombre
            <input v-model="nombre" type="text" required>
        </label>
        <label>
            Cedula
            <input v-model="cedula" type="text" minlength="10" required>
        </label>
        <button type="submit">Actualizar</button>
    </form>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { getEmpleado,updateEmpleado } from '@/models/empleado';

const nombre = ref('');
const cedula = ref('');

const router = useRouter();

const route = useRoute();
const empleadoId = route.params.id;

const update = async() =>{
    try{
        await updateEmpleado(empleadoId,nombre.value,cedula.value);
        router.push('/');
    }
    catch{
        alert('Empleado no se pudo actualizar, cedula puede ya estar registrada')
        initFields();
    }
};

const initFields = async () =>{
    const empleado = await getEmpleado(empleadoId)
    nombre.value = empleado.nombre_empleado;
    cedula.value = empleado.cedula;
}

onMounted(async () =>{
    initFields();
})
</script>