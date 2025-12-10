<template>
    <div class="modal-backdrop" :class="{ show: visible }" @click.self="close">
        <transition name="slide">
            <div class="modal" v-if="visible">
                <h2>Delete Activity</h2>

                <p>Are you sure you want to delete this activity?</p>

                <div class="buttons">
                    <button class="delete" @click="remove">Delete</button>
                    <button @click="close">Cancel</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
import { toast } from 'vue3-toastify'
import { useActivityStore } from '../../../store/activity.store'

const props = defineProps<{
    visible: boolean
    activityId: number
}>()

const emit = defineEmits<{
    (e: 'update'): void
    (e: 'close'): void
}>()

const activityStore = useActivityStore()

async function remove() {
    try {
        await activityStore.deleteActivity(props.activityId)
        toast.success("Activity deleted!")
        emit('update')
        emit('close')
    } catch (err) {
        toast.error(`Failed to delete activity: ${err}`)
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

p {
    color: white;
    margin: 1vh 0 2vh 0;
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

.delete {
    border-color: #ff4c4c;
    color: #ff4c4c;
}

.delete:hover {
    background-color: #550000;
}

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
