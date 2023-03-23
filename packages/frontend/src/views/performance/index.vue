<template>
  <div class="container">
    <PerCard class="percard"></PerCard>
    <Carousel class="carousel"></Carousel>
    <ListVue class="list"></ListVue>
  </div>
</template>

<script setup lang="ts">
import PerCard from './components/PerCard.vue'
import Carousel from './components/Carousel.vue'
import ListVue from './components/List.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { usePerformance } from '@/stores/index'
import { Polling } from '@/utils/polling'
const performance = usePerformance()
const polling = new Polling([performance.getPerformance])
onMounted(() => {
  polling.created()
})
onBeforeUnmount(() => {
  polling.destroyed()
})
</script>
<style scoped>
.container {
  display: grid;
  height: 100%;
  grid-template-columns: 1.5fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 3rem;
}
.percard {
  grid-column: 1/3;
}
</style>
