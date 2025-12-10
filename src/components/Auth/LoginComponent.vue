<template>
    <div class="login-container">
        <h2>Login</h2>

        <input 
            v-model="request.username" 
            placeholder="Username..." 
            required
        />

        <input 
            v-model="request.password" 
            type="password" 
            placeholder="Password..." 
            required
            @keyup.enter="login"
        />

        <div class="footer">
            <span>No account yet? 
                <b @click="goRegister">Register</b>
            </span>
        </div>

        <button @click="login">Login</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { UserRequest } from '../../types/auth'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '../../store/auth.store'

const authStore = useAuthStore()
const router = useRouter()
const request = ref<UserRequest>({
    username: '',
    password: ''
}) 

function login() {
    if (!request.value.username.trim() || !request.value.password.trim()) {
        toast.error("Fill the required fields!")
        return
    }

    authStore.login(request.value, router)
}

function goRegister() {
    router.push('/register')
}
</script>

<style scoped>
.login-container {
    width: 90%;
    max-width: 400px;
    margin: 10vh auto;
    padding: 2rem;
    background: #242424;
    color: white;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid white;
    background: #121212;
    color: white;
}

button {
    padding: 0.7rem;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

button:hover {
    background: #45a049;
}

.footer b {
    cursor: pointer;
    color: #00d2fc;
}
</style>
