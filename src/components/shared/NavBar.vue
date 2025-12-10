<template>
    <div class="navbar">
        <div class="app-name" @click="router.push('/home')">
            <img 
                src="../../assets/technology.png"
                class="site-icon" 
            />
            <h2 class="bit">Bit</h2>
            <h2 class="shop">Shop</h2>
        </div>

        <div class="right-section">

            
            <!-- CART ICON -->
            <img 
                src="../../assets/box.png"
                class="cart-icon"
                alt="Cart"
                @click="router.push('/order')"
            />
            <img 
                src="../../assets/shopping-cart.png"
                class="cart-icon"
                alt="Cart"
                @click="router.push('/cart')"
            /> 

            <div class="app-username">
                <h3 class="username" @click="toggleMenu">{{ username }}</h3>

                <div class="dropdown" v-show="showMenu"> 
                    <span @click="logout">Log out</span>
                </div>
            </div>

        </div> 
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue'  
import { useAuthStore } from '../../store/auth.store'; 
import { useRouter } from 'vue-router';

const router = useRouter()
const username = ref<string | null>(null);
const showMenu = ref(false);
const authStore = useAuthStore()


onMounted(async () => {
    username.value = localStorage.getItem("username")
    const user = localStorage.getItem("username") 
    if (!user){
        alert('Please login!')
        router.push('/')
    }
});

function toggleMenu() {
    showMenu.value = !showMenu.value;
} 

function logout() {
    localStorage.removeItem("username") 
    localStorage.removeItem("userId")
    authStore.clear()

    showMenu.value = false
    username.value = null
    router.push("/")
} 
</script>

<style scoped>
.navbar {
    width: 100vw;
    height: 8vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #242424;
    border-bottom: 1px solid gray; 
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 0 5px gray;
}

.bit{
    color: #00d2fc;
}
.shop{
    color: #6b7ed9;
}

.app-name {
    color: white;
    cursor: pointer;
    margin-left: 2vw;
    display: flex;
    align-items: center;
}

.right-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: auto;
    margin-right: 2vw;
}

/* cart icon */
.cart-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: auto;
}
.site-icon {
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-left: auto;
}

.cart-icon:hover {
    opacity: 0.8;
}

.auth h3 {
    color: white;
    cursor: pointer;
    margin: 0;
}

.app-username {
    position: relative;
    cursor: pointer;
}

.username {
    color: white;
    margin: 0;
}

.dropdown {
    position: absolute;
    right: 0;
    top: 120%;
    background: #2c2c2c;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    min-width: 150px;
    z-index: 50;
}

.dropdown span {
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
}

.dropdown span:hover {
    background: #444;
}

</style>
