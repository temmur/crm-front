<template>
  <div class="bg-white p-6 rounded-2xl shadow-md">
    <h3 class="text-lg font-semibold text-gray-700 mb-4">Total Orders</h3>
    <div class="h-[300px]">
      <Bar v-if="loaded" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


const loaded = ref(false)

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Orders",
      data: [120, 200, 150, 80, 70, 110, 130],
      backgroundColor: "rgba(59,130,246,0.7)",
      borderRadius: 6,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#64748b" },
    },
    y: {
      grid: { color: "rgba(226,232,240,0.5)" },
      ticks: { color: "#64748b" },
    },
  },
}

onMounted(() => {
  loaded.value = true
})
</script>

