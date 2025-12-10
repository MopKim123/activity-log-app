import { defineStore } from 'pinia' 
import type { LoginResponse, UserRequest } from '../types/auth'
import { type Router } from 'vue-router'
import { loginUser } from '../service/auth'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        userId: Number(localStorage.getItem('userId')) || null, 
        username: localStorage.getItem('username'),  
    }),

    actions: {
        clear() {
            this.userId = null
            this.username = ''
            localStorage.removeItem('userId')
            localStorage.removeItem('username')
        },  
        setUser(user: LoginResponse) { 
            localStorage.setItem("username", user.username) 
            localStorage.setItem("userId", user.id.toString())
        }, 
        async login(user: UserRequest, router: Router) { 
            try {   
                const data = await loginUser(user);    
                console.log("user",data)  
                this.setUser(data)    
                router.push('/home')
            } catch (err) {
                // toast.error(`User not found! ${err}`) 
            }
        },  
    }
})
