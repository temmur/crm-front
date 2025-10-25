<template>
  <div class="min-h-screen bg-gray-50 py-10 px-6">
    <h1
        class="text-3xl font-bold text-center text-blue-700 mb-10 flex items-center justify-center gap-3"
    >
      📅 Sayohat Kalendar
    </h1>

    <!-- Kalendar kartasi -->
    <div
        class="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300"
    >
      <FullCalendar
          :plugins="[dayGridPlugin, interactionPlugin]"
          initial-view="dayGridMonth"
          :events="events"
          selectable="true"
          @dateClick="handleDateClick"
      />
    </div>

    <!-- Modal (Tadbir qo‘shish) -->
    <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
          class="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          📆 {{ selectedDate }} sanasiga tadbir qo‘shish
        </h2>
        <input
            v-model="eventTitle"
            type="text"
            placeholder="Tadbir nomi (masalan: Buxoro safari)"
            class="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="flex justify-center gap-3">
          <button
              @click="addEvent"
              class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium"
          >
            Saqlash
          </button>
          <button
              @click="showModal = false"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-full font-medium"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ref } from "vue";

const showModal = ref(false);
const selectedDate = ref("");
const eventTitle = ref("");
const events = ref([
  {
    title: "Buxoro safari",
    start: "2025-10-27",
    color: "#3b82f6",
  },
  {
    title: "Istanbul sayohati",
    start: "2025-11-02",
    color: "#16a34a",
  },
]);

const handleDateClick = (info) => {
  selectedDate.value = info.dateStr;
  showModal.value = true;
};

const addEvent = () => {
  if (eventTitle.value.trim()) {
    events.value.push({
      title: eventTitle.value,
      start: selectedDate.value,
      color: "#2563eb",
    });
    eventTitle.value = "";
    showModal.value = false;
  } else {
    alert("Iltimos, tadbir nomini kiriting!");
  }
};
</script>

<style scoped>
@import "@/assets/main.css";

h1 {
  font-family: "Poppins", sans-serif;
}
</style>
