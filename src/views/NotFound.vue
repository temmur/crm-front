<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-gray-600 text-lg mb-8">
      Kechirasiz, bu sahifa topilmadi yoki o‘chirilgan.
    </p>

    <Button
        text="Bosh sahifaga qaytish"
        variant="dark"
        @click="$router.push('/')"
    />
  </div>
</template>

<script setup>
import Button from '@/components/Form/CButton.vue'
</script>

<style scoped>
/* ixtiyoriy: sahifaga biroz animatsiya yoki ko‘rinish berish */
h1 {
  animation: pop 0.4s ease-in-out;
}

@keyframes pop {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
