<template>
  <div class="relative w-full">
    <input
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        class="w-full rounded-2xl bg-gray-100 pl-10 pr-4 py-2 text-gray-700
             focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none
             transition-all duration-200"
    />
    <slot name="icon" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search...',
  },
  type: {
    type: String,
    default: 'text',
  },
})

const emit = defineEmits(['update:modelValue'])
const inputValue = ref(props.modelValue)

watch(inputValue, (val) => emit('update:modelValue', val))
</script>
