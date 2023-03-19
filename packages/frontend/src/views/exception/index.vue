<template>
  <div class="container">
    <div class="charts"><ExceptionCharts></ExceptionCharts></div>
    <div class="list"><ExceptionList></ExceptionList></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import ExceptionCharts from './components/ExceptionCharts.vue'
import ExceptionList from './components/ExceptionList.vue'
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.charts {
  height: 25rem;
  position: relative;
}
.list {
  flex: 1;
}
</style>
