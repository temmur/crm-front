<template>
  <header class="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-100">
    <!-- Left: Search Input -->
    <div class="flex items-center space-x-3 w-full max-w-md">
     <CSearch/>
    </div>

    <!-- Right: Buttons -->
    <div class="flex items-center space-x-4">
      <CButton text="Sign In" variant="light" button-class="mr-2!"/>
      <CButton text="Sign Up" variant="dark"/>
    </div>
  </header>
</template>
<script setup lang="ts">
import CButton from "@/components/Form/CButton.vue";
import CSearch from "@/components/Form/CSearch.vue";
</script>
