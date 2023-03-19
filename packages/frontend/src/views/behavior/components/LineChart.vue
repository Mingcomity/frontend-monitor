<template>
  <!--  通过ref获取html元素 宽高必须设置 -->
  <div class="div">
    <header class="header">
      <div class="title">统计折线表</div>
    </header>
    <main class="main">
      <div ref="myChart" class="chart"></div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onBeforeUpdate, nextTick, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { useBehavior } from '@/stores/index'
import { storeToRefs } from 'pinia'
const behavior = useBehavior()
const { getLineChart: data } = storeToRefs(behavior)

function echartsDisposition(data?: any) {
  return {
    animationDuration: 2000,
    tooltip: {
      // 多系列提示框浮层排列顺序。
      order: 'valueDesc', // 降序排序
      // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
      trigger: 'axis'
    },
    legend: {
      data: ['Pv', 'Uv']
    },
    xAxis: {
      name: '日期',
      type: 'category',
      data: [
        '6d ago',
        '5d ago',
        '4d ago',
        '3d ago',
        '2d ago',
        'Yesterday',
        'Today'
      ]
    },
    yAxis: {
      name: '数值',
      type: 'value'
    },
    series: [
      {
        name: 'Pv',
        data: data.Pv,
        type: 'line',
        // 曲线
        smooth: true,
        endLabel: {
          show: true,
          formatter: '{b}: {@score}'
        },
        labelLayout: {
          // 在标签重叠的时候是否挪动标签位置以防止重叠。
          moveOverlap: 'shiftY'
        },
        // 折线图的高亮状态。
        emphasis: {
          // 在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
          focus: 'series'
        }
      },
      {
        name: 'Uv',

        data: data.Uv,
        type: 'line',
        // 曲线
        smooth: true,
        endLabel: {
          show: true,
          formatter: '{b}: {@score}'
        },
        labelLayout: {
          // 在标签重叠的时候是否挪动标签位置以防止重叠。
          moveOverlap: 'shiftY'
        },
        // 折线图的高亮状态。
        emphasis: {
          // 在高亮图形时，是否淡出其它数据的图形已达到聚焦的效果。
          focus: 'series'
        }
      }
    ]
  }
}

//通过ref获取html元素
const myChart = ref()
let userEc: any, infoEl
onMounted(async () => {
  await nextTick()
  // 渲染echarts的父元素
  infoEl = myChart.value
  userEc = echarts.init(infoEl, 'light')
  window.addEventListener('resize', function () {
    userEc.resize()
  })
  userEc.setOption(echartsDisposition(data.value))
  //侦听数据变化
  watchEffect(() => {
    const option = echartsDisposition(data.value)
    userEc.setOption(option)
  })
})
</script>
<style scoped>
.div {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.chart {
  width: 100%;
  height: 100%;
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
  padding-top: 2rem;
  border: 1px solid var(--el-border-color);
  height: 100%;
}
</style>
