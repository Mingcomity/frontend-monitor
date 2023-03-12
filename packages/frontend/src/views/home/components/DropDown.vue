<template>
  <el-dropdown
    split-button
    size="large"
    max-height="300"
    @command="handleCommand"
  >
    当前项目:{{ theCurrentProject }}
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="value in list"
          :key="value.id"
          :command="value.id"
          >{{ value.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProjectStore, useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

const projectInfo = useProjectStore()
const userInfo = useUserStore()
const { projectArr: list } = storeToRefs(projectInfo)
// 修改已选项目
const handleCommand = async (id: number) => {
  projectInfo.theCurrentProject = id
  await userInfo.updatedProjectData()
}
// 返回当前项目名
const theCurrentProject = computed(() => {
  if (projectInfo.projectArr) {
    const project = projectInfo.projectArr.find(
      (value) => value.id === projectInfo.theCurrentProject
    )
    return project?.name
  }
  return '暂无项目'
})
</script>
<style scoped>
:deep(.el-button-group) {
  display: flex;
  align-items: center;
}
</style>
