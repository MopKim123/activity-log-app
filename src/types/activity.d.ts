
export interface ActivityLogRequest {
    userId: number
    activityTypeId: number
    description?: string
}

export interface ActivityLogResponse {
    id?: number
    userId?: number
    activityTypeId?: number
    description?: string
    createdAt?: string
}

export interface ActivityTypeResponse {
    id?: number
    name?: string
}


export interface ActivityLogFilterRequest {
    activityTypeId?: number
    startDate?: string
    endDate?: string
}