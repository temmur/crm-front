<template>
  <div class="w-64  bg-gray-900 text-white flex flex-col p-5! space-y-5! min-h-screen">
<!--    <img src='../components/images/1398811a-776a-40c9-8bc9-3d2e46bdba83_removalai_preview.png'>-->
   <router-link to="/">
     <p class="text-xl font-bold px-9!">CRM Panel</p>
   </router-link>
    <ul class="space-y-2! bg-gray-900">

        <router-link
            v-for="(item, i) in nav"
            :key="i"
            :to="item.router">
          <li
              class="p-3! my-9! px-9! cursor-pointer
               bg-gray-900! text-white font-medium
               transition-all duration-200
               hover:bg-slate-800! hover:text-whitesmoke
        rounded-full"
          >
            {{item.title}}
          </li>
        </router-link>
    </ul>
  </div>

</template>

<script setup>

import {ref} from "vue";

const  menu = [
  "Vazifalar",
  "Xabarlar",
  "Joylashuvlar",
  "Sozlamalar",
  "Kalendar",
  "Xarita",

]
const nav = ref([
  {
    title: 'Vazifalar',
    router: ''
  },
  {
    title: "Xabarlar",
    router: 'news'
  },
  {
    title: 'Joylashuvlar',
    router: ''
  },
  {
    title: "Sozlamalar",
    router: 'settings'
  },
  {
    title: 'Kalendar',
    router: ''
  },
  {
    title: 'Xarita',
    router: 'map'
  }
])
</script>
