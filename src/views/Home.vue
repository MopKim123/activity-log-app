

<template> 
    <div class="container">
        <NavBar/>
        <!-- <DisplayComponent/> -->
    </div>
</template>

<script setup lang="ts">
import NavBar from '../components/shared/NavBar.vue';


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
