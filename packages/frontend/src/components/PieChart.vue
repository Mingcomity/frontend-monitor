<template>
  <!--  通过ref获取html元素 宽高必须设置 -->
  <div ref="myChart" class="chart" style="width: 100%; height: 100%"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onBeforeUpdate, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any

const props = defineProps<{
  title: string
  data: {
    textArr: string[]
    valueArr: {
      value: number
      name: string
    }[]
  }
}>()

// 配置项函数
const disposition = (data: {
  title: string
  data: {
    textArr: string[]
    valueArr: {
      value: number
      name: string
    }[]
  }
}) => {
  return {
    title: {
      // 标题
      text: data.title,
      left: 'center'
    },
    tooltip: {
      // 提示框
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      // 组件离下侧的距离
      bottom: '0%',
      // 组件离左侧的距离
      left: 'center',
      // 文本
      data: data.data.textArr
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: data.data.valueArr,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
// 数据更新后配置项
const updata = (data: {
  title: string
  data: {
    textArr: string[]
    valueArr: {
      value: number
      name: string
    }[]
  }
}) => {
  return {
    title: {
      // 标题
      text: data.title
    },

    legend: {
      data: data.data.textArr
    },
    series: [
      {
        data: data.data.valueArr
      }
    ]
  }
}
//通过ref获取html元素
const myChart = ref()
let userEc: any, infoEl
onMounted(async () => {
  // 渲染echarts的父元素
  infoEl = myChart.value

  await nextTick()
  //  light dark
  userEc = echarts.init(infoEl, 'light')

  // 指定图表的配置项和数据
  const option = disposition(props)
  window.addEventListener('resize', function () {
    userEc.resize()
  })
  // 使用刚指定的配置项和数据显示图表。
  userEc.setOption(option)
  // proxy.$echartsResize(userEc)
})
onBeforeUpdate(async () => {
  await nextTick()
  // 指定图表的配置项和数据
  const option = disposition(props)

  // 使用刚指定的配置项和数据显示图表。
  userEc.setOption(option)
})
</script>
<style scoped></style>
