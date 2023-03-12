<template>
  <div>
    <header class="header">
      <div class="title">较差页面</div>
      <div>
        <el-select
          v-model="value"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in data"
            :key="item.typeNum"
            :value="item.type"
          />
        </el-select>
      </div>
    </header>
    <main class="main">
      <el-table class="table" ref="tableRef" :data="list" height="330">
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
          prop="value"
          align="center"
          label="数值(ms)"
          width="100"
          :filters="filterArr"
          :filter-method="filterTag"
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
          :total="total"
          :page-size="pageSize"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRaw } from 'vue'
import type { TableInstance } from 'element-plus'
import { usePerformance } from '@/stores/index'
import { storeToRefs } from 'pinia'
const performance = usePerformance()
// 当前页面数据
const { getfrom: data } = storeToRefs(performance)
// 当前选项值
const type = ref<number>(data.value[0].typeNum)
const value = ref<string>(data.value[0].type)
// 监听是哪类的性能
watch(value, (newVal, oldVal) => {
  // 切换时页码归零
  page.value = 1
  type.value = data.value.find((val) => val.type === newVal)?.typeNum as number
})
// 当前页数
const page = ref<number>(1)
// 总条目数
const total = computed<number>((): number => {
  const a = data.value.find((val) => val.typeNum === type.value)?.list.length
  return a as number
})
// 每页显示条数
const pageSize = ref<number>(10)
// 列表渲染值-根据当前页数计算出需要展现的数据
const list = computed(() => {
  const arr = data.value.find((val) => val.type === value.value)?.list
  const beginIndex = (page.value - 1) * pageSize.value
  const endIndex = page.value * pageSize.value
  return arr?.slice(beginIndex, endIndex)
})

const tableRef = ref<TableInstance>()
// 定义选择区间
const filterArr = computed<Array<{ text: string; value: string }>>(
  (): Array<{ text: string; value: string }> => {
    const sublevel = performance.getSublevelText.find(
      (val) => val.type === type.value
    )
    const arr: Array<{ text: string; value: string }> = []
    sublevel?.interval.forEach((val) => {
      const obj = {
        text: val.text,
        value: JSON.stringify(val.number)
      }
      arr.push(obj)
    })
    return arr
  }
)
// 过滤函数
const filterTag = (value: any, row: any) => {
  const interval = JSON.parse(value)
  if (row.value < interval[1] && row.value >= interval[0]) return true
}
</script>
<style scoped>
.scrollbar-flex-content {
  height: 30px;
  overflow: hidden;
  margin-right: 30px;
  padding: 2px 10px;
  font-size: 10px;
  border-radius: 4px;
  border: solid 1px var(--el-border-color);
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 24.5rem;
}
.page {
  margin-bottom: 1rem;
}
.aa {
  width: 400px;
}
</style>
