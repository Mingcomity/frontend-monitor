<template>
  <div class="container">
    <UserOverview class="userover"></UserOverview>
    <HotList class="hotList"></HotList>
    <LineChart class="lineChart"></LineChart>
    <StayRanking class="stayranking"></StayRanking>
  </div>
</template>

<script setup lang="ts">
import UserOverview from './components/UserOverview.vue'
import HotList from './components/HotList.vue'
import LineChart from './components/LineChart.vue'
import StayRanking from './components/StayRanking.vue'
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 40rem 1fr;
  grid-template-rows: auto 2fr 2fr;
  gap: 2rem;
}
.userover {
  grid-column: 1/-1;
}
.hotList {
  grid-column: 1/2;
}
.lineChart {
  grid-column: 2/-1;
}
.stayranking {
  grid-column: 1/-1;
}
</style>
