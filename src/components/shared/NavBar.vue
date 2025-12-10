<template>
    <nav class="navbar">
        <div class="greeting">Welcome Back, {{ authStore.username }}!</div>
        <ul class="nav-links"> 
            <li><button @click="logout">Logout</button></li>
        </ul>
    </nav>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router" 
import { toast } from "vue3-toastify"
import { useAuthStore } from "../../store/auth.store"
import { onMounted } from "vue"

const router = useRouter()
const authStore = useAuthStore()

function logout() {
    authStore.clear()
    toast.info("Logged out")
    router.push("/")
}

onMounted(() => {
    // if (!authStore.username) {
    //     router.push("/")
    // }
}) 
</script>

<style scoped>
.navbar {
    width: 100vw;
    height: 8vh;
    padding: 0 1vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #242424;
    border-bottom: 1px solid gray; 
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 0 5px gray;;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 1rem;
    align-items: center;
}

.nav-links li button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
}

.nav-links li button:hover {
    text-decoration: underline;
}

.nav-links a {
    color: white;
    text-decoration: none;
}

.nav-links a:hover {
    text-decoration: underline;
}

.greeting {
    font-weight: bold;
    font-size: 1.2rem;
}
</style>
