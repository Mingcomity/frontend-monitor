<template>
  <el-container>
    <el-header class="header">
      <h1 class="title">前端监控系统</h1>
      <DropDown></DropDown>
    </el-header>
    <el-container>
      <aside class="aside">
        <Menu></Menu>
      </aside>
      <el-main class="main">
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import DropDown from './components/DropDown.vue'
import Menu from './components/Menu.vue'
</script>
<style scoped>
.el-container {
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--el-border-color);
}
.main {
  background-color: antiquewhite;
}
.title {
  display: flex;
  font-weight: 500;
  font-size: 20px;
  justify-content: center;
  align-items: center;
}
.aside {
}
</style>
