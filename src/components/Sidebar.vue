<template>
  <div class="w-64  bg-gray-900 text-white flex flex-col p-5 space-y-5 min-h-screen">
    <!-- Logo -->



    <img src='../components/images/1398811a-776a-40c9-8bc9-3d2e46bdba83_removalai_preview.png'>


    <!-- Menu -->
    <ul class="space-y-2 bg-gray-900">
      <li
          v-for="(item, i) in menu"
          :key="i"
          class="p-9 px-9  cursor-pointer
               bg-gray-900 text-white font-medium
               transition-all duration-200
               hover:bg-slate-900 hover:text-whitesmoke
        rounded-full"
      >
        {{ item }}
      </li>
    </ul>
  </div>

</template>

<script setup>

const  menu = [
  "Vazifalar",
  "Xabarlar",
  "Joylashuvlar",
  "Sozlamalar",
  "Kalendar",
  "Xarita",

]
</script>
