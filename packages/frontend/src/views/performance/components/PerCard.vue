<template>
  <div>
    <header class="title">页面平均性能</header>
    <el-row :gutter="20" v-cloak>
      <Card
        :title="val.type"
        v-for="val in list"
        :key="val.typeNum"
        class="cards"
      >
        <template #default>
          <div>{{ val.avg }}ms</div>
        </template>
      </Card>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Card from '@/components/Card.vue'
import { usePerformance } from '@/stores/index'

const performance = usePerformance()
// 获取平均数据
const list = computed(() => {
  return performance.getAvg
})
</script>
<style scoped>
.title {
  font-weight: 600;
  margin-bottom: 1rem;
}
.cards {
  margin-bottom: 1.2rem;
}
[v-cloak] {
  display: none;
}
</style>
