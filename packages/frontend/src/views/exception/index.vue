<template>
  <div class="container">
    <div class="charts"><ExceptionCharts></ExceptionCharts></div>
    <div class="list"><ExceptionList></ExceptionList></div>
  </div>
</template>

<script setup lang="ts">
import ExceptionCharts from './components/ExceptionCharts.vue'
import ExceptionList from './components/ExceptionList.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { useExceptionStore } from '@/stores/index'
import { Polling } from '@/utils/polling'
const exception = useExceptionStore()
const polling = new Polling([exception.getException])
onMounted(() => {
  polling.created()
})
onBeforeUnmount(() => {
  polling.destroyed()
})
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
