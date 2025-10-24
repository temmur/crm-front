<template>
  <div class="bg-white rounded-2xl shadow p-4 w-full max-w-md mx-auto">
    <h2 class="text-xl font-semibold mb-3 text-gray-800">To-Do List</h2>

    <div class="flex gap-2 mb-4">
      <input
          v-model="newTask"
          @keyup.enter="addTask"
          placeholder="Add a new task..."
          class="flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
          @click="addTask"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add
      </button>
    </div>

    <ul class="space-y-2">
      <li
          v-for="(task, index) in tasks"
          :key="index"
          class="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
      >
        <span :class="{ 'line-through text-gray-400': task.done }">
          {{ task.text }}
        </span>
        <div class="flex gap-2">
          <button
              @click="toggleDone(index)"
              class="text-green-500 hover:text-green-700"
          >
            ✔️
          </button>
          <button
              @click="removeTask(index)"
              class="text-red-500 hover:text-red-700"
          >
            ✖️
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const newTask = ref("");
const tasks = ref([]);

function addTask() {
  if (newTask.value.trim() !== "") {
    tasks.value.push({ text: newTask.value, done: false });
    newTask.value = "";
  }
}

function toggleDone(index) {
  tasks.value[index].done = !tasks.value[index].done;
}

function removeTask(index) {
  tasks.value.splice(index, 1);
}
</script>
<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>