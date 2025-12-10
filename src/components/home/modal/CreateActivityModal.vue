<template>
    <!-- Backdrop -->
    <div class="modal-backdrop" :class="{ show: visible }" @click.self="close">
        <transition name="slide">
            <div class="modal" v-if="visible">
                <h2>Create Activity</h2>

                <label>Activity Type</label>
                <select v-model="request.activityTypeId" required>
                    <option value="" disabled>Select type</option>
                    <option v-for="type in activityTypes" :key="type.id" :value="type.id">
                        {{ type.name }}
                    </option>
                </select>
                <label>Description</label>
                <textarea v-model="request.description" placeholder="Description (optional)"></textarea>

                <div class="buttons">
                    <button @click="create">Create</button>
                    <button @click="close">Cancel</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue' 
import { toast } from 'vue3-toastify'
import type { ActivityLogRequest, ActivityTypeResponse } from '../../../types/activity';
import { useActivityStore } from '../../../store/activity.store';
import { useAuthStore } from '../../../store/auth.store';

defineProps<{
    visible: boolean
    activityTypes: ActivityTypeResponse[]
}>()

const emit = defineEmits<{
    (e: 'update'): void
    (e: 'close'): void
}>()

const activityStore = useActivityStore()
const authStore = useAuthStore()

const request = ref({} as ActivityLogRequest)

async function create() {
    if (!request.value.activityTypeId) {
        toast.error("Select activity type!")
        return
    }

    request.value.userId = Number(authStore.userId)

    try {
        await activityStore.createActivity(request.value)
        toast.success("Activity created!")
        request.value = {} as ActivityLogRequest
        emit('update')
        emit('close')
    } catch (err) {
        toast.error(`Failed to create activity: ${err}`)
    }
}

function close() {
    emit('close')
}
</script>

<style scoped>
.modal{
    background-color: #242424; 
    padding: 4vh;
    width: 25vw;
    border-radius: 2vh;
    display: flex;
    flex-direction: column;
}

h2 {
    color: white;
    margin-bottom: 2vh;
}

label {
    color: white;
    margin-top: 1vh;
}

select, textarea {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid white;
    width: 100%;
    background-color: #121212;
    color: white;
}

textarea {
    min-height: 4rem;
    min-width: 95%;
    max-width: 95%;
}

.buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
}

button {
    background-color: #242424;
    color: white;
    border: 1px solid white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
}

button:hover { background-color: #444; }
button:active { background-color: #242424; }

.modal-backdrop {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(124,124,124,0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.modal-backdrop.show {
    opacity: 1;
    pointer-events: all;
}

.slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
}
.slide-enter-from { opacity: 0; transform: translateY(-10%); }
.slide-enter-to { opacity: 1; transform: translateY(0); }
.slide-leave-from { opacity: 1; transform: translateY(0); }
.slide-leave-to { opacity: 0; transform: translateY(-10%); }
</style>
