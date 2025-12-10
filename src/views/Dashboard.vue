

<template> 
    <div class="container">
        <NavBar/>
        <DashboardComponent/>
    </div>
</template>

<script setup lang="ts"> 
import DashboardComponent from '../components/home/DashboardComponent.vue';
import NavBar from '../components/shared/NavBar.vue';


</script>

<style scoped>
.container{ 
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #121212;
}
</style>
