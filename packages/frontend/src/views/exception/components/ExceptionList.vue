<template>
  <div style="height: 100%; position: relative">
    <header class="header">
      <div class="title">异常信息展示</div>
    </header>
    <main class="main">
      <el-table
        ref="tableRef"
        row-key="date"
        :data="data"
        style="width: 100%"
        height="350"
      >
        <el-table-column
          prop="time"
          label="时间"
          sortable
          width="180"
          column-key="date"
        />
        <el-table-column
          prop="name"
          label="异常类型"
          :filters="[
            { text: 'JS_Exception', value: 'JS_Exception' },
            { text: 'Resource_Exception', value: 'Resource_Exception' },
            { text: 'Fetch_Exception', value: 'Fetch_Exception' },
            { text: 'Promise_Exception', value: 'Promise_Exception' }
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
          width="180"
        />
        <el-table-column prop="msg" label="异常信息" />
        <el-table-column prop="position" label="URL" width="400" />
      </el-table>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'
import { useExceptionStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
const exception = useExceptionStore()
const { exceptionList: data } = storeToRefs(exception)
interface User {
  date: string
  name: string
  address: string
  tag: string
}

const tableRef = ref<TableInstance>()

const filterTag = (value: string, row: User) => {
  return row.name === value
}
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
  padding: 1rem;
  border: 1px solid var(--el-border-color);
}
</style>
