import { defineStore } from 'pinia' 
import type { LoginResponse, UserRequest } from '../types/auth'
import { type Router } from 'vue-router'
import { loginUser } from '../service/auth'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userId: Number(localStorage.getItem('userId')) || 0, 
        username: localStorage.getItem('username') || '',  
    }),

    actions: {
        clear() {
            this.userId = 0
            this.username = ''
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
        },  
        setUser(user: LoginResponse) { 
            this.userId = user.id
            this.username = user.username
            localStorage.setItem("username", user.username) 
            localStorage.setItem("token", user.token) 
            localStorage.setItem("userId", user.id.toString())
        }, 
        async login(user: UserRequest, router: Router) { 
            try {   
                const data = await loginUser(user);    
                this.setUser(data)    
                router.push('/home')
            } catch (err) {
                // toast.error(`User not found! ${err}`) 
            }
        },  
    }
})
