<template>
  <div class="containerDiv">
    <PerList class="perlist"></PerList>
    <ExcepCharts class="excepCharts"></ExcepCharts>
    <Carousel class="carousel"></Carousel>
    <BehLineChart class="behlinecharts"></BehLineChart>
  </div>
</template>

<script setup lang="ts">
import PerList from '@/views/performance/components/PerCard.vue'
import Carousel from '@/views/performance/components/Carousel.vue'
import BehLineChart from '@/views/behavior/components/LineChart.vue'
import ExcepCharts from '@/views/exception/components/ExceptionCharts.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { useBehavior, usePerformance, useExceptionStore } from '@/stores/index'
import { Polling } from '@/utils/polling'
const behavior = useBehavior()
const performance = usePerformance()
const exception = useExceptionStore()
const polling = new Polling([
  performance.getPerformance,
  behavior.getBehvior,
  exception.getException
])
onMounted(() => {
  polling.created()
})
onBeforeUnmount(() => {
  polling.destroyed()
})
</script>
<style scoped>
.containerDiv {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 2rem;
}
.perlist {
  grid-column: 1/-1;
}
.excepCharts {
  grid-column: 1/-1;
}
.carousel {
  height: 20rem;
  margin-bottom: 1rem;
}
.behlinecharts {
  display: block;
  height: 22.6rem;
  margin-bottom: 1rem;
}
</style>
