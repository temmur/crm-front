<template>
  <transition name="fade">
    <div v-if="show" class="welcome-screen">
      <div class="welcome-content">
        <h1 class="welcome-text">
          <span class="typing">Xush kelibsiz!</span>
        </h1>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(true)

onMounted(() => {
  setTimeout(() => {
    show.value = false
  }, 3500) // 3.5 soniyadan keyin yo'qoladi
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.welcome-screen {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #f7f9fb, #dbeafe);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeInBg 1s ease forwards;
}

.welcome-content {
  text-align: center;
}

.welcome-text {
  font-size: 2.8rem;
  font-weight: bold;
  color: #1e3a8a;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.typing {
  display: inline-block;
  overflow: hidden;
  border-right: 3px solid #1e3a8a;
  white-space: nowrap;
  animation: typing 2s steps(15), blink 0.8s infinite step-end alternate;
}

@keyframes fadeInBg {
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
