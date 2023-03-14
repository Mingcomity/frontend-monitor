<template>
  <div class="stay">
    <header class="header">
      <div class="title">页面停留时间排行</div>
    </header>
    <main class="main">
      <el-table :data="data" height="210">
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
  console.log(arr)
  return arr
})
</script>
<style scoped>
.header {
  margin: 1rem 0;
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
}
.stay {
  height: 1rem;
}
</style>
