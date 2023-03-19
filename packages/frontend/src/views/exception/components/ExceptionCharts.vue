<template>
  <div style="height: 25rem; position: relative">
    <header class="header">
      <div class="title">异常数据总览</div>
      <throwsAnException></throwsAnException>
    </header>
    <main class="main">
      <div ref="chart" style="width: 100%; height: 100%"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { useExceptionStore } from '@/stores/index'
import throwsAnException from './throwsAnException.vue'
const exception = useExceptionStore()
const chart = ref()

// 饼图数据处理
const pieChartDataProcessing = (typeList: string[], data: any[]) => {
  const arr: any[] = []
  typeList.forEach((val) => {
    let add = 0
    data
      .filter((value) => value[1] === val)
      .forEach((value) => (add += value[2]))
    const list = {
      name: val,
      value: add
    }
    arr.push(list)
  })
  return arr
}

// echarts 配置项
const echartsDisposition = (rawData: any): echarts.EChartsOption => {
  const countries = [
    'JS_Exception',
    'Resource_Exception',
    'Fetch_Exception',
    'Promise_Exception'
  ]
  // 处理饼图数据
  const pieData = pieChartDataProcessing(countries, rawData)

  const datasetWithFiltersScatter: echarts.DatasetComponentOption[] = []
  const seriesListScatter: echarts.SeriesOption[] = []
  // 遍历创建(散点图)数据集包括series
  echarts.util.each(countries, function (country) {
    // 命名
    const datasetId = 'dataset_scatter' + country
    // 设定过滤器————用于散点图
    datasetWithFiltersScatter.push({
      id: datasetId,
      fromDatasetId: 'dataset_raw',
      transform: {
        type: 'filter',
        config: {
          and: [
            { dimension: 'type', '=': country },
            {
              dimension: 'value',
              '>': 0
            }
          ]
        }
      }
    })
    // 设定series————用于散点图
    seriesListScatter.push({
      type: 'scatter',
      datasetId: datasetId,
      name: country,
      xAxisIndex: 0,
      yAxisIndex: 0,
      // 高亮
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'time',
        y: 'value',
        label: ['value'],
        itemName: 'time',
        tooltip: ['value']
      },
      markArea: {
        silent: true,
        itemStyle: {
          color: 'transparent',
          borderWidth: 1,
          borderType: 'dashed'
        },
        data: [
          [
            {
              xAxis: 'min',
              yAxis: 'min'
            },
            {
              xAxis: 'max',
              yAxis: 'max'
            }
          ]
        ]
      },
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      }
    })
  })
  return {
    animationDuration: 1000,
    color: [
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc'
    ],
    dataset: [
      {
        id: 'dataset_raw',
        source: [['time', 'type', 'value'], ...rawData]
      },
      ...datasetWithFiltersScatter
    ],
    // 提示框
    tooltip: [
      {
        showDelay: 0,
        formatter: function (params: any) {
          if (params.value.length > 1) {
            return (
              params.seriesName +
              ' :<br/>' +
              '日期: ' +
              params.value[0] +
              '<br/>' +
              '数量: ' +
              params.value[2]
            )
          } else {
            return params.name + ' : ' + params.value
          }
        },
        axisPointer: {
          show: true,
          type: 'cross',
          lineStyle: {
            type: 'dashed',
            width: 1
          }
        }
      }
    ],
    // 工具栏
    toolbox: [
      {
        right: '40%',
        feature: {
          dataZoom: {},
          brush: {
            type: ['rect', 'polygon', 'clear']
          }
        }
      }
    ],
    // 区域缩放
    brush: {},
    // 展示不同系列标记
    legend: [{ data: countries, bottom: 10 }],
    // x轴
    xAxis: [
      {
        // grid 选择
        gridIndex: 0,
        // 是否显示
        show: true,
        // 坐标轴数据类型
        type: 'category',
        // 名称
        name: '时间',
        // 坐标轴名称位置
        nameLocation: 'end',
        // 轴线设置
        axisLine: {
          show: true,
          symbol: ['none', 'arrow']
        },
        // 刻度设置
        axisTick: {
          show: true
        },
        // 分隔线
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        gridIndex: 0,
        type: 'value',
        scale: true, // 分隔线
        splitLine: {
          show: false
        }
      }
    ],
    grid: [
      {
        right: '40%',
        left: '5%'
      }
    ],
    series: [
      ...seriesListScatter,
      {
        left: '60%',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        startAngle: 180,
        label: {
          show: true,
          formatter(param) {
            if (param.percent)
              return param.name + ' (' + param.percent * 2 + '%)'
            return param.name
          }
        },
        data: [
          ...pieData,
          {
            value:
              pieData[0].value +
              pieData[1].value +
              pieData[2].value +
              pieData[3].value
                ? pieData[0].value +
                  pieData[1].value +
                  pieData[2].value +
                  pieData[3].value
                : 1,
            itemStyle: {
              color: 'none',
              decal: {
                symbol: 'none'
              }
            },
            label: {
              show: false
            }
          }
        ]
      }
    ]
  }
}
onMounted(async () => {
  await nextTick()
  const myChart = echarts.init(chart.value)

  window.addEventListener('resize', function () {
    myChart.resize()
  })
  watchEffect(() => {
    myChart.setOption(echartsDisposition(exception.dailyData))
  })
})
</script>
<style scoped>
.header {
  position: absolute;
  margin-bottom: 1rem;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  right: 0;
  left: 0;
  top: 0;
}
.title {
  font-weight: 600;
}
.main {
  position: absolute;
  top: 3rem;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 1rem;
  border: 1px solid var(--el-border-color);
}
</style>
