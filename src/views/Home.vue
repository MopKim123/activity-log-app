

<template> 
    <div class="container">
        <NavBar/>
        <DisplayComponent/>
    </div>
</template>

<script setup lang="ts">
import DisplayComponent from '../components/home/DisplayComponent.vue';
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
