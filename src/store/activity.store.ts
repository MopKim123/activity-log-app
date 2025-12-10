import { defineStore } from 'pinia'  
import type { ActivityLogFilterRequest, ActivityLogRequest, ActivityLogResponse, ActivityTypeResponse } from '../types/activity'
import { createActivityLog, deleteActivityLog, getActivityLogsByUser, getAllActivityTypes, updateActivityLog } from '../service/activity'

export const useActivityStore = defineStore('activity', {
    state: () => ({
        activites: [] as ActivityLogResponse[], 
        activiteTypes: [] as ActivityTypeResponse[], 
        selectedActivity: {} as ActivityLogResponse,  
    }),

    actions: {
        clear() {
            this.activites = [] 
            this.activiteTypes = [] 
            this.selectedActivity = {} 
        },  
        setActivities(data: ActivityLogResponse[]) {  
            this.activites = data 
        }, 
        async getMyActivities(userId: number, filter?: ActivityLogFilterRequest) { 
            try {   
                const data = await getActivityLogsByUser(userId, filter);    
                this.setActivities(data)    
            } catch (err) {
                console.error(`Activities not found! ${err}`) 
            }
        },  
        async createActivity(request: ActivityLogRequest) { 
            try {   
                const data = await createActivityLog(request);    
                this.activites.push(data) 
            } catch (err) {
                console.error(`Activities not found! ${err}`) 
            }
        },  
        async updateActivity(activityId: number, typeId: number, description: string) {
            try {
                const updated = await updateActivityLog(activityId, typeId, description)

                const index = this.activites.findIndex(a => a.id === activityId)
                if (index !== -1) {
                    this.activites[index]!.description = updated.description
                    this.activites[index]!.activityTypeId = updated.activityTypeId
                }
            } catch (err) {
                console.error(`Failed to update activity: ${err}`)
            }
        },
        async deleteActivity(id: number) {
            try {
                await deleteActivityLog(id)
                this.activites = this.activites.filter(a => a.id !== id)
            } catch (err) {
                console.error(`Failed to delete activity: ${err}`)
                throw err
            }
        },
        setActivityTypes(data: ActivityTypeResponse[]) {  
            this.activiteTypes = data 
        }, 
        async getActivityTypes() { 
            try {   
                const data = await getAllActivityTypes();    
                this.setActivityTypes(data)    
            } catch (err) {
                console.error(`Activity types not found! ${err}`) 
            }
        },  
    }
})
