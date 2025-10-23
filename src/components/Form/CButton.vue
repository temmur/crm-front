<template>
  <button
      :class="[
      'px-4 py-2 rounded-lg font-semibold focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
      buttonClasses,
    ]"
      :disabled="props.disabled"
  >
    <slot name="prefix"></slot>
    {{text}}
    <slot name="suffix"></slot>
  </button>
</template>

<script setup lang="ts">
import {DefineProps, computed} from "vue";

const props = withDefaults(
    defineProps<{
      text: string
      variant: 'light' | 'dark' | 'green' | 'error'
      buttonClass: string
      disabled: boolean
      error: boolean
    }>(),
    {
      text: 'Click me',
      variant: 'light',
      buttonClass: '',
      disabled: false,
      error: false,
    }
)
const variants = {
  light:
      'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition',
  dark:
      'bg-gray-900 text-white border border-gray-700 hover:bg-gray-800 active:bg-black transition',
  error:
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 border border-red-600 transition',
}
const buttonClasses = computed(() => {
  if (props.error) return variants.error
  return variants[props.variant] + ' ' + props.buttonClass
})
</script>

<style scoped>
</style>
