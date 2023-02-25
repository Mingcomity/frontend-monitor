<template>
  <div class="sidebar">
    <div class="menu">
      <el-menu
        default-active="1"
        class="menu-vertical"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><IEpMenu /></el-icon>
          <template #title>总览</template>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><IEpWarningFilled /></el-icon>
          <template #title>异常监控</template>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><IEpUserFilled /></el-icon>
          <template #title>用户行为</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><IEpHistogram /></el-icon>
          <template #title>性能数据</template>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><IEpTools /></el-icon>
          <template #title>账号设置</template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="btn">
      <el-button text @click="isCollapse = !isCollapse">
        <el-icon v-if="isCollapse"><IEpExpand /></el-icon>
        <el-icon v-if="!isCollapse"><IEpFold /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped>
.menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.menu {
  height: 100%;
  overflow: hidden;
  border-bottom: 1px solid var(--el-border-color);
}
:deep(.el-button) {
  padding: 20px;
}
.item {
  width: 200px;
}
</style>
