<template>
  <div>
    <h1>Data Visualization</h1>
    <div>
      <KPI>
      </KPI>
    </div>
    <div class="chart-wrapper">
      <Suspense>
        <GlobalViz />
      </Suspense>
    </div>
  </div>
</template>
<style scoped>

.chart-wrapper {
  width: 100%; /* ou une largeur spécifique en pixels ou en pourcentage */
}
</style>

<script>
import GlobalViz from '@/components/Dataviz/GlobalViz.vue';
import KPI from '@/components/Dataviz/KPI.vue';

export default {
  name: 'DataVizualisation',
  components: {
    GlobalViz,
    KPI,
  }
};

</script>
