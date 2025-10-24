<template>
  <RouterView/>
  <div>
    <WelcomeScreen />

  </div>
</template>

<script setup>
import WelcomeScreen from './views/WelcomeScreen.vue';
import { RouterView } from 'vue-router';

</script>
