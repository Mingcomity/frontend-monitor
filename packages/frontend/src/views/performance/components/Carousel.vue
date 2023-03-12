<template>
  <div>
    <header class="title">性能统计</header>
    <el-carousel
      indicator-position="outside"
      :interval="6000"
      class="carouselChart"
      :autoplay="false"
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
.title {
  height: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.carouselChart {
  border: 1px solid var(--el-border-color);
  padding: 2rem 0rem;
}
</style>
