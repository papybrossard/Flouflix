<template>
  <div class="chart-container">
    <div class="chart-item">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div class="chart-item">
      <canvas ref="donutCanvas"></canvas>
    </div>
  </div>
</template>

<style>
.chart-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100vh; /* or any height you want */
}

.chart-item {
  flex: 1;
}

.chart-item canvas {
  width: 100%;
  height: 100%;
}
</style>


<script>

import {onMounted, ref,} from 'vue';
//import KPI from '@/components/Dataviz/KPI.vue';

import {
  ArcElement,
  CategoryScale,
  Chart,
  DoughnutController,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title
} from 'chart.js';

import axios from 'axios';
import { urlAPI } from '@/assets/const.js';

export default {
  name: 'GlobalViz',
  async setup() {

    const chartCanvas = ref(null);
    const donutCanvas = ref(null);
    const chartInstance = ref(null);
    const donutInstance = ref(null);

    onMounted(async () => {
      try {
        fetchData().then((response) => {
          createChart(chartCanvas.value, donutCanvas.value, response);
        })
      } catch (error) {
        console.log("Il y a une erreur: " + error);
      }

      function createChart(lineCanvas, donutCanvas, data) {
        Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Title);
        Chart.register(DoughnutController, ArcElement);

        chartInstance.value = new Chart(lineCanvas, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: [
              {
                label: 'Data',
                data: data.values,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true
          }
        });
        donutInstance.value = new Chart(donutCanvas, {
          type: 'doughnut',
          data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [
              {
                label: 'Data',
                data: [20, 30, 10, 15, 25],
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)']
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true
          }
        });
      }
    });

    return {
      chartCanvas,
      chartInstance,
      donutCanvas,
      donutInstance
    };
  }
};

async function fetchData() {
  try {
    const response = await axios.get(urlAPI+'/dwh/test/integration');
    if (response.data.code === 200) {
      return response.data.result;
    } else {
      console.log('Failed to fetch data');
    }
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

</script>
