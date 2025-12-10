<script setup lang="ts">
import { ToastifyContainer } from 'vue3-toastify';

</script>

<template>
    <toastify-container :clear-on-url-change="false"/>
    <router-view />
</template>


<style scoped> 
</style>
