<template>
  <div class="sidebar">
    <div class="menu">
      <el-menu
        class="menu-vertical"
        :collapse="isCollapse"
        :router="true"
        :default-active="router.currentRoute.value.fullPath"
      >
        <el-menu-item index="/home/overview">
          <el-icon><IEpMenu /></el-icon>
          <template #title>总览</template>
        </el-menu-item>
        <el-menu-item index="/home/exception">
          <el-icon><IEpWarningFilled /></el-icon>
          <template #title>异常监控</template>
        </el-menu-item>
        <el-menu-item index="/home/behavior">
          <el-icon><IEpUserFilled /></el-icon>
          <template #title>用户行为</template>
        </el-menu-item>
        <el-menu-item index="/home/performance">
          <el-icon><IEpHistogram /></el-icon>
          <template #title>性能数据</template>
        </el-menu-item>
        <el-menu-item index="/home/setting">
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
import { useRouter } from 'vue-router'
const isCollapse = ref(false)
const router = useRouter()
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
  border-right: 1px solid var(--el-border-color);
}
.menu {
  height: 100%;
  overflow: hidden;
  border-bottom: 1px solid var(--el-border-color);
}
:deep(.el-button) {
  padding: 20px;
}
:deep(.el-menu) {
  border: none;
}
.item {
  width: 200px;
}
</style>
