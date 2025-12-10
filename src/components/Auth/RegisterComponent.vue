<template>
    <div class="register-container">
        <h2>Register</h2>

        <input 
            v-model="request.username" 
            placeholder="Username..." 
            required
        />

        <input 
            v-model="request.email" 
            type="email" 
            placeholder="Email..." 
            required
        />

        <input 
            v-model="request.password" 
            type="password" 
            placeholder="Password..." 
            required
        />

        <input 
            v-model="request.confirmPassword" 
            type="password" 
            placeholder="Confirm Password..." 
            required
        />

        <div class="footer">
            <span>Already have an account? 
                <b @click="goLogin">Login</b>
            </span>
        </div>

        <button @click="register">Register</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import type { RegisterRequest } from '../../types/auth'
import { registerUser } from '../../service/auth'

const router = useRouter()
const request = ref<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

function register() {
    const { username, email, password, confirmPassword } = request.value

    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        toast.error("Fill all required fields!")
        return
    }

    // basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        toast.error("Enter a valid email!")
        return
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match!")
        return
    }

    // registration logic here
    registerUser(request.value)
    router.push('/')
}

function goLogin() {
    router.push('/')
}
</script>

<style scoped>
.register-container {
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
