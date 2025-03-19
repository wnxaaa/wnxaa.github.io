<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()

const menuList = ref([]);

// 加载目录
function loadMenu() {
    axios.get("/menu.json")
        .then(function (res) {
            if (res.status == 200) {
                if (res.data) {
                    menuList.value = res.data;
                }
            }
        });
}
loadMenu();
</script>
<template>
    <header>
        <h1>WNX's blog</h1>
    </header>
    <main>
        <p v-if="menuList.length == 0">加载中~</p>
        <ul>
            <li v-for="(item, index) in menuList" :key="index" @click="router.push('/' + item.id)">
                {{ item.name }}
            </li>
        </ul>
    </main>
</template>