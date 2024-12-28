import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";
import CrearEmpleado from "@/views/CrearEmpleado.vue";
import CrearDepartamento from "@/views/CrearDepartamento.vue";
import CrearGasto from "@/views/CrearGasto.vue";
import UpdateEmpleado from "@/views/UpdateEmpleado.vue";
import UpdateDepartamento from "@/views/UpdateDepartamento.vue";
import UpdateGasto from "@/views/UpdateGasto.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Index },
    { path: "/crearEmpleado", component: CrearEmpleado },
    { path: "/actualizarEmpleado/:id", component: UpdateEmpleado },
    { path: "/crearDepartamento", component: CrearDepartamento },
    { path: "/actualizarDepartamento/:id", component: UpdateDepartamento },
    { path: "/crearGasto", component: CrearGasto },
    { path: "/actualizarGasto/:id", component: UpdateGasto },
  ],
});

export default router;