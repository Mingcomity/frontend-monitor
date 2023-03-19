<template>
  <el-container class="container">
    <el-header class="header">
      <h1 class="title">前端监控系统</h1>
      <DropDown></DropDown>
    </el-header>
    <el-container>
      <aside class="aside">
        <Menu @on-click="controlMenu"></Menu>
      </aside>
      <el-main class="main" :class="{ controlMain: menu }">
        <RouterView v-slot="{ Component }">
          <transition
            class="animate__faster"
            :enter-active-class="enter"
            :leave-active-class="leave"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'animate.css'
import DropDown from './components/DropDown.vue'
import Menu from './components/Menu.vue'
import { onBeforeRouteUpdate } from 'vue-router'
const menu = ref<boolean>()
// 子传父函数
const controlMenu = (control: boolean) => {
  menu.value = control
}
// 前缀
const prefix = 'animate__animated'
// 下入
const fadeInDown = ' animate__fadeInDown'
// 下出
const fadeOutDown = ' animate__fadeOutDown'
// 上入
const fadeInUp = ' animate__fadeInUp'
// 上出
const fadeOutUp = ' animate__fadeOutUp'
let enter = ref<string>()
let leave = ref<string>()
onBeforeRouteUpdate((to, from, next) => {
  if ((to.meta.index as number) < (from.meta.index as number)) {
    enter.value = prefix + fadeInDown
    leave.value = prefix + fadeOutDown
    next()
  } else if ((to.meta.index as number) > (from.meta.index as number)) {
    enter.value = prefix + fadeInUp
    leave.value = prefix + fadeOutUp
    next()
  }
})
</script>
<style scoped>
.container {
  width: 100%;
}
:deep(.animate__faster) {
  width: 100%;
  height: 100%;
}
.el-container {
  height: 100%;
}
.header {
  display: flex;
  position: relative;
  justify-content: space-between;
  border-bottom: 1px solid var(--el-border-color);
  user-select: none;
}
.aside {
  position: absolute;
  top: 60px;
  bottom: 0;
  height: calc(100vh - var(--el-header-height));
  overflow-y: auto;
}
.main {
  position: absolute;
  top: 60px;
  left: 200px;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  height: calc(100vh - var(--el-header-height));
  transition: all 500ms;
}
.controlMain {
  left: 60px;
}
.title {
  display: flex;
  font-weight: 500;
  font-size: 20px;
  justify-content: center;
  align-items: center;
}
</style>
