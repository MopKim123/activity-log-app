<template>
    <div class="activities-container">
        <h2>Student Activity Tracker</h2>

        <div class="activities-top">
            <button class="create-btn" @click="showCreateModal = true">Create Activity</button>

            <!-- Activity Type Filter -->
            <select v-model="selectedTypeId">
                <option :value="null">All Types</option>
                <option v-for="type in activityTypes" :key="type.id" :value="type.id">
                    {{ type.name }}
                </option>
            </select>

            <!-- Start Date -->
            <input type="date" v-model="startDate" />

            <!-- End Date -->
            <input type="date" v-model="endDate" />

            <button @click="applyFilters">Filter</button>
            <button @click="clearFilters">Clear</button>

        </div>

        <table v-if="activities.length" class="activities-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Activity Type</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="activity in activities" :key="activity.id">
                    <td>{{ activity.id }}</td>
                    <td>{{ getActivityTypeName(activity.activityTypeId) }}</td>
                    <td>{{ activity.description || '-' }}</td>
                    <td>{{ formatDate(activity.createdAt) }}</td>
                    <td>
                        <button class="edit-btn" @click="editActivity(activity)">Edit</button>
                        <button class="delete-btn" @click="deleteActivity(activity.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-else class="empty">
            <p>No activities found.</p>
        </div>


        <CreateActivityModal
            :visible="showCreateModal" 
            :activityTypes="activityTypes" 
            @close="showCreateModal = false"
            @update="fetchData()"
        />
        <EditActivityModal
            :visible="showEditModal" 
            :activity="selectedActivity"
            :activityTypes="activityTypes" 
            @close="showEditModal = false"
            @update="fetchData()"
        />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue' 
import { useActivityStore } from '../../store/activity.store'
import { useAuthStore } from '../../store/auth.store'
import type { ActivityLogResponse, ActivityTypeResponse, ActivityLogFilterRequest } from '../../types/activity'
import { deleteActivityLog } from '../../service/activity'
import { toast } from 'vue3-toastify'
import CreateActivityModal from './modal/CreateActivityModal.vue'
import EditActivityModal from './modal/EditActivityModal.vue'

const activityStore = useActivityStore()
const authStore = useAuthStore()

const showCreateModal = ref(false)
const showEditModal = ref(false)

const activities = ref<ActivityLogResponse[]>([])
const selectedActivity = ref<ActivityLogResponse>({})
const activityTypes = ref<ActivityTypeResponse[]>([])

// Filters
const selectedTypeId = ref<number | null>(null)
const startDate = ref<string | null>(null)
const endDate = ref<string | null>(null)

function getActivityTypeName(typeId: number | null | undefined) {
    const type = activityTypes.value.find(t => t.id === typeId)
    return type ? type.name : '-'
}

function formatDate(date: string | undefined | null) {
    if (!date) return '-'
    return new Date(date).toLocaleString()
}

async function fetchData(filter?: ActivityLogFilterRequest) {
    const userId = authStore.userId
    if (!userId) return

    await activityStore.getMyActivities(userId, filter)
    activities.value = activityStore.activites

    await activityStore.getActivityTypes()
    activityTypes.value = activityStore.activiteTypes
}

function editActivity(activity: ActivityLogResponse) {
    selectedActivity.value = activity
    showEditModal.value = true
}

async function deleteActivity(id: number | undefined) {
    if (!id) return
    try {
        await deleteActivityLog(id)
        toast.success(`Activity ${id} deleted`)
        activities.value = activities.value.filter(a => a.id !== id)
    } catch (err) {
        toast.error(`Failed to delete activity: ${err}`)
    }
}

function applyFilters() {
    const filter: ActivityLogFilterRequest = {}
    if (selectedTypeId.value) filter.activityTypeId = selectedTypeId.value
    if (startDate.value) filter.startDate = startDate.value
    if (endDate.value) filter.endDate = endDate.value

    fetchData(filter)
}

function clearFilters() {
    selectedTypeId.value = null
    startDate.value = null
    endDate.value = null
    fetchData()
}

onMounted(fetchData)
</script>

<style scoped>
.activities-container {
    padding: 2rem;
    background-color: #121212;
    min-height: 90vh;
    color: white;
    min-width: 80%;
}

.activities-top {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
}

.activities-top select,
.activities-top input {
    padding: 0.4rem;
    border-radius: 4px;
    border: none;
}

.activities-top button {
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
}

.activities-top button:hover {
    background-color: #16AF50;
}

.create-btn{
    margin-right: auto;
}

.activities-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    background-color: #242424;
}

.activities-table th,
.activities-table td {
    padding: 10px;
    border: none;
    text-align: left;
    color: white;
}

.activities-table tr {
    background-color: #333;
    margin-bottom: 0.5rem;
}

.edit-btn {
    margin-right: 0.5rem;
    background: #4CAF50;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
}

.edit-btn:hover {
    background: #16AF50;
}

.delete-btn {
    background: #a00000;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
}

.delete-btn:hover {
    background: #cc0000;
}

.empty {
    margin-top: 2rem;
    text-align: center;
}
</style>
