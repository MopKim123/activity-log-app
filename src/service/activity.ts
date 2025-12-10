import axios from "axios"  
import type { ActivityLogFilterRequest, ActivityLogRequest, ActivityLogResponse, ActivityTypeResponse } from "../types/activity"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getActivityLogsByUser(
    userId: number,
    filter?: ActivityLogFilterRequest
): Promise<ActivityLogResponse[]> {
    try {
        const res = await axios.get<ActivityLogResponse[]>(
            `${API_BASE_URL}/logs/user/${userId}`,
            { params: filter }
        )
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch activity logs")
    }
}

export async function createActivityLog(request: ActivityLogRequest): Promise<ActivityLogResponse> {
    console.log("create request",request)
    try {
        const res = await axios.post<ActivityLogResponse>(
            `${API_BASE_URL}/logs`,
            request
        )
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to create activity log")
    }
}

export async function updateActivityLog(id: number, description?: string): Promise<ActivityLogResponse> {
    try {
        const res = await axios.put<ActivityLogResponse>(
            `${API_BASE_URL}/logs/${id}`,
            null,
            { params: { description } }
        )
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update activity log")
    }
}

export async function deleteActivityLog(id: number): Promise<void> {
    try {
        await axios.delete(`${API_BASE_URL}/logs/${id}`)
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to delete activity log")
    }
}

export async function getAllActivityTypes(): Promise<ActivityTypeResponse[]> {
    try {
        const res = await axios.get<ActivityTypeResponse[]>(`${API_BASE_URL}/activity-types`)
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch activity types")
    }
}