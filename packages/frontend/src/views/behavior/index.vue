<template>
  <div>
    <header class="header">
      <UserOverview></UserOverview>
    </header>
    <main class="main">
      <div class="one">
        <HotList class="hotList"></HotList>
        <LineChart class="lineChart"></LineChart>
      </div>
      <div class="two">
        <StayRanking></StayRanking>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import UserOverview from './components/UserOverview.vue'
import HotList from './components/HotList.vue'
import LineChart from './components/LineChart.vue'
import StayRanking from './components/StayRanking.vue'
</script>
<style scoped>
.header {
  margin-bottom: 2rem;
}

.one {
  display: flex;
}
.hotList {
  width: 50%;
  margin-right: 2rem;
}
.lineChart {
  width: 50%;
}
.two {
  height: 6rem;
}
</style>
