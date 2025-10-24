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
      <div class="p-4">
        <CLangSwitcher v-model="selectedLang"
                       :languages="availableLanguages" />
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import CButton from "@/components/Form/CButton.vue";
import CSearch from "@/components/Form/CSearch.vue";
import CLangSwitcher from "@/components/UI/CLangSwitcher.vue";
import { useI18n } from 'vue-i18n'

import {ref} from "vue";

const selectedLang = ref(localStorage.getItem('locale') || 'en')

const availableLanguages = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: "O'zbekcha" },

]
const { t } = useI18n()
</script>
