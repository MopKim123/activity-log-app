

<template> 
    <div class="container">
        <RegisterComponent/>
    </div>
</template>

<script setup lang="ts">
import RegisterComponent from '../components/Auth/RegisterComponent.vue';


</script>

<style scoped>
.container{ 
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #121212;
}
</style>
