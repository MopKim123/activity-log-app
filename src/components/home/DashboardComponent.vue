<template>
    <div class="dashboard-container">
        <h1>Activity Dashboard</h1>

        <div class="dashboard-cards">
            <div class="card">
                <h2>Total Activities</h2>
                <p>{{ totalActivities }}</p>
            </div>

            <div class="card">
                <h2>Most Frequent Activity</h2>
                <p>{{ mostFrequentActivityType || '-' }}</p>
            </div>

            <div class="card">
                <h2>Activities by Type</h2>
                <ul>
                    <li v-for="type in activitiesByType" :key="type.id">
                        {{ type.name }}: {{ type.count }}
                    </li>
                </ul>
            </div>

            <div class="card">
                <h2>Most Recent Activity</h2>
                <p>{{ recentActivityText || '-' }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue' 
import { useActivityStore } from '../../store/activity.store'
import { useAuthStore } from '../../store/auth.store'
import type { ActivityLogResponse, ActivityTypeResponse } from '../../types/activity'

const activityStore = useActivityStore()
const authStore = useAuthStore()

const activities = ref<ActivityLogResponse[]>([])
const activityTypes = ref<ActivityTypeResponse[]>([])

async function fetchData() {
    if (!authStore.userId) return
    await activityStore.getMyActivities(authStore.userId)
    activities.value = activityStore.activites

    await activityStore.getActivityTypes()
    activityTypes.value = activityStore.activiteTypes
}

onMounted(fetchData)

const totalActivities = computed(() => activities.value.length)
const mostFrequentActivityType = computed(() => {
    if (!activities.value.length) return null
    const counts: Record<number, number> = {}
    activities.value.forEach(a => {
        if (a.activityTypeId != null) counts[a.activityTypeId] = (counts[a.activityTypeId] || 0) + 1
    })
    const maxId = Object.keys(counts).reduce((a, b) => {
        const countA = counts[Number(a)] ?? 0
        const countB = counts[Number(b)] ?? 0
        return countA > countB ? a : b
    }, Object.keys(counts)[0] ?? '0')
    const type = activityTypes.value.find(t => t.id === Number(maxId))
    return type?.name ?? null
})

const activitiesByType = computed(() => {
    return activityTypes.value.map(t => ({
        id: t.id,
        name: t.name,
        count: activities.value.filter(a => a.activityTypeId === t.id).length
    }))
})

const recentActivityText = computed(() => {
    if (!activities.value.length) return null
    const sorted = [...activities.value].sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return timeB - timeA
    })
    const recent = sorted[0]
    if (!recent) return null
    const type = activityTypes.value.find(t => t.id === recent.activityTypeId)
    return `${type?.name ?? '-'} - ${recent.description ?? 'No description'}`
})

</script>

<style scoped>
.dashboard-container {
    padding: 2rem;
    background-color: #121212;
    color: white;
    min-height: 90vh;
    min-width: 80%;
}

.dashboard-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

p{
    font-weight: bold;
}

.card {
    background-color: #242424;
    padding: 1.5rem;
    border-radius: 1rem;
}

.card h2 {
    margin-bottom: 1rem;
    color: #00d2fc;
}

.card ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.card ul li {
    margin-bottom: 0.5rem;
}
</style>
