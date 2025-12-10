

<template> 
    <div class="container">
        <LoginComponent/>
    </div>
</template>

<script setup lang="ts">
import LoginComponent from '../components/Auth/LoginComponent.vue';

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
