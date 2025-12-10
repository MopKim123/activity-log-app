import axios from "axios" 
import type { LoginResponse, UserRequest } from "../types/auth"
import { toast } from "vue3-toastify"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function loginUser(user: UserRequest): Promise<LoginResponse> {
    try {
        const res = await axios.post<LoginResponse>(
            `${API_BASE_URL}/users/login`,
            user,
            { withCredentials: true }
        )
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed")
    }
}
export async function registerUser(user: UserRequest): Promise<LoginResponse> {
    try {
        const res = await axios.post<LoginResponse>(
            `${API_BASE_URL}/users/register`,
            user,
            { withCredentials: true }
        )
        if(res.status) toast.success("Register Successful!")
        return res.data
    } catch (error: any) {
        if(error.response?.data?.status === 500) toast.error(`Registration Failed! Username is Taken`)
        throw new Error(error.response?.data?.message || "Login failed")
    }
}
