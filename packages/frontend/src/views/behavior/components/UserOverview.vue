<template>
  <div class="cardList">
    <el-card shadow="never">
      <template #header>
        <span class="title">用户访问数据</span>
      </template>
      <div class="dataBox">
        <div>
          <div>今日浏览量(PV)</div>
          <p class="data">
            {{ data.pv.value }}
          </p>
          <p class="compare">
            较昨日
            <span
              :class="{
                down: data.pv.contrast < 0,
                up: data.pv.contrast >= 0
              }"
            >
              {{ Math.abs(data.pv.contrast).toFixed(1) }}%
              {{ data.pv.contrast >= 0 ? '↑' : '↓' }}
            </span>
          </p>
        </div>
        <div>
          <div>今日访客数(UV)</div>
          <p class="data">
            {{ data.uv.value }}
          </p>
          <p class="compare">
            较昨日
            <span
              :class="{
                down: data.uv.contrast < 0,
                up: data.uv.contrast >= 0
              }"
            >
              {{ Math.abs(data.uv.contrast).toFixed(1) }}%
              {{ data.uv.contrast >= 0 ? '↑' : '↓' }}
            </span>
          </p>
        </div>
        <div>
          <div>平均浏览时长</div>
          <p class="data">{{ data.averageBrowsing.toFixed(0) }} s</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useBehavior } from '@/stores/index'
import { storeToRefs } from 'pinia'
const behavior = useBehavior()
const { getUserOverview: data } = storeToRefs(behavior)
</script>
<style scoped>
.title {
  font-weight: 600;
}
.dataBox {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  text-align: center;
}

.dataBox > div {
  width: 33%;
  display: flex;
  flex-direction: column;
}

.dataBox > div > .data {
  font-size: 2.4rem;
  margin: 0.2rem 0;
}

.compare {
  font-size: 15px;
  color: gray;
}

.compare > span.up {
  color: rgb(228, 23, 23);
}

.compare > span.down {
  color: rgb(6, 122, 11);
}

.box-card {
  width: 30%;
  margin: 0.5rem 0;
}

.cardList {
  text-align: center;
}
</style>
