<template>
  <div class="div">
    <header class="header">
      <div class="title">最近七天页面热度排行</div>
    </header>
    <main class="main">
      <el-table class="table" ref="tableRef" :data="lotList" height="250">
        <el-table-column prop="from" label="来源页面" column-key="date">
          <template #default="scope">
            <el-scrollbar class="scrollbar-flex-content">
              <div>
                <p class="aa">{{ scope.row.from }}</p>
              </div>
            </el-scrollbar></template
          >
        </el-table-column>
        <el-table-column
          prop="pv"
          align="center"
          label="浏览数量"
          width="100"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column
          prop="uv"
          align="center"
          label="访客数量"
          width="100"
          filter-placement="bottom-end"
        >
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          v-model:current-page="page"
          small
          background
          layout="prev, pager, next"
          :total="data.length"
          :page-size="pageSize"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBehavior } from '@/stores/index'
import { storeToRefs } from 'pinia'
const behavior = useBehavior()
const { getHotView: data } = storeToRefs(behavior)
// 当前页数
const page = ref<number>(1)
// 每页显示条数
const pageSize = ref<number>(10)
// 列表渲染值-根据当前页数计算出需要展现的数据
const lotList = computed(() => {
  const beginIndex = (page.value - 1) * pageSize.value
  const endIndex = page.value * pageSize.value
  return data.value.slice(beginIndex, endIndex)
})
</script>
<style scoped>
.div {
  display: flex;
  flex-direction: column;
}
.scrollbar-flex-content {
  height: 2rem;
  overflow: hidden;
  margin-right: 3rem;
  padding: 2px 10px;
  font-size: 10px;
  border-radius: 4px;
  border: solid 1px var(--el-border-color);
}
.header {
  margin-bottom: 1rem;
  height: 2rem;
  display: flex;
  align-items: center;
}
.title {
  font-weight: 600;
}
.main {
  height: 100%;
  border: 1px solid var(--el-border-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.page {
  margin: 1rem 0;
}
.aa {
  width: 20rem;
}
</style>
