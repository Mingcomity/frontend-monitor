<template>
  <div class="div">
    <header class="header">
      <div class="title">页面停留时间排行</div>
    </header>
    <main class="main">
      <el-table :data="data" height="190">
        <el-table-column prop="from" label="来源 URL" />
        <el-table-column prop="duration" label="时间" width="180" />
      </el-table>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useBehavior } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { processDuration } from '@/utils/percentage'
const behavior = useBehavior()
const { browse } = storeToRefs(behavior)
const data = computed(() => {
  const arr = []
  for (let i = 0; i < browse.value.rankingList.length; i++) {
    const from = browse.value.rankingList[i].from
    const duration = processDuration(browse.value.rankingList[i].duration)
    arr.push({ from, duration })
  }
  return arr
})
</script>
<style scoped>
.div {
  display: flex;
  flex-direction: column;
}
.header {
  margin-bottom: 1rem;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-weight: 600;
}
.main {
  border: 1px solid var(--el-border-color);
  height: 100%;
}
</style>
