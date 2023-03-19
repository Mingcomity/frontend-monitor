<template>
  <div>
    <header class="header">
      <div class="title">性能统计</div>
    </header>
    <el-carousel
      indicator-position="outside"
      :interval="5000"
      class="carouselChart"
      :autoplay="true"
    >
      <el-carousel-item v-for="item in data" :key="item.type">
        <PieChart :title="item.typeText" :data="item.data"></PieChart>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { usePerformance } from '@/stores/index'
import PieChart from '@/components/PieChart.vue'
import { storeToRefs } from 'pinia'
const performance = usePerformance()
const { getcarouselPieChart: data } = storeToRefs(performance)
</script>
<style scoped>
.header {
  margin-bottom: 1rem;
  height: 2rem;
}
.title {
  font-weight: 600;
}
.carouselChart {
  border: 1px solid var(--el-border-color);
  padding: 2rem 0rem;
}
</style>
