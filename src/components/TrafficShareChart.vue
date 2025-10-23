<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
    <h3 class="text-gray-500 text-sm font-medium">Traffic Share</h3>

    <div class="flex items-center justify-between mt-4">

      <div class="w-24 h-24">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>

      <div class="space-y-1 text-sm text-gray-600">
        <p><span class="inline-block w-3 h-3  rounded-full mr-2"><img src="https://cdn-icons-png.flaticon.com/512/4373/4373065.png"> </span>Desktop 60%</p>
        <p><span class="inline-block w-3 h-3  rounded-full mr-2"><img src="https://cdn-icons-png.flaticon.com/512/15/15874.png"></span>Mobile Web 30%</p>
        <p><span class="inline-block w-3 h-3 -500 rounded-full mr-2"><img src="https://cdn-icons-png.flaticon.com/512/3616/3616856.png"></span>Tablet Web 10%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ["Desktop", "Mobile Web", "Tablet Web"],
  datasets: [
    {
      data: [60, 30, 10],
      backgroundColor: ["#06b6d4", "#6366f1", "#10b981"],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  cutout: "70%",
  plugins: { legend: { display: false } },
};
</script>
