<template>
  <div class="flex min-h-screen! bg-gray-50">
    <Sidebar class="w-64! bg-gray-900! shadow-lg fixed inset-y-0 left-0! z-20!" />
    <div class="ml-64! flex! flex-1 flex-col">
      <CHeader/>
      <main class="p-6! flex-1">
        <RouterView />
      </main>
      <div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import CHeader from "@/components/Common/CHeader.vue";
import { RouterView } from 'vue-router'

</script>
