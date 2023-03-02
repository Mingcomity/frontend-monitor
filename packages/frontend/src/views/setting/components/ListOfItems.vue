<template>
  <div class="container">
    <header class="header">
      <div class="title">项目列表</div>
      <el-button class="addBtn" type="success" @click="addProject"
        >添加项目</el-button
      >
    </header>
    <el-table class="table" :data="list" style="width: 100%" height="280">
      <el-table-column prop="numbering" label="编号" width="100" />
      <el-table-column prop="name" label="名称" width="100" />
      <el-table-column prop="SdkScript" label="SDK key">
        <template #default="scope">
          <div class="script">
            <el-scrollbar class="scrollbar-flex-content">
              <div>
                <p class="aa">{{ scope.row.SdkScript }}</p>
              </div>
            </el-scrollbar>
            <el-button
              type="primary"
              size="small"
              @click="copyCode(scope.row.SdkScript)"
            >
              <el-icon><IEpCopyDocument /></el-icon>
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="chooseProject(scope.row.id)"
            >选择项目</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="reviseProjectName(scope.row.id)"
            >修改名称</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useProjectStore, useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()
const projectInfo = useProjectStore()
const userInfo = useUserStore()
const { projectArr: list } = storeToRefs(projectInfo)
// 复制函数
const copyCode = async (val: string) => {
  try {
    await toClipboard(val)
    //@ts-ignore
    ElMessage({
      type: 'success',
      message: `复制成功！`
    })
  } catch (error) {
    //@ts-ignore
    ElMessage({
      type: 'info',
      message: '该浏览器不支持自动复制！'
    })
  }
}
// 添加项目
const addProject = async () => {
  try {
    //@ts-ignore
    const { value: name } = await ElMessageBox.prompt(
      '请输入项目名',
      '添加项目',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: (value: string) => {
          if (value.trim() === '') return false
          return true
        },
        inputErrorMessage: '项目名不能为空！'
      }
    )
    const data: AddProject = {
      id: userInfo.id,
      name: name.trim()
    }
    await projectInfo.addProject(data)
  } catch (error) {
    //@ts-ignore
    ElMessage({
      type: 'info',
      message: '取消输入'
    })
  }
}
// 修改项目名
const reviseProjectName = async (id: number) => {
  try {
    //@ts-ignore
    const { value: name } = await ElMessageBox.prompt(
      '请输入新的项目名',
      '修改项目名',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: (value: string) => {
          if (value.trim() === '') return false
          return true
        },
        inputErrorMessage: '项目名不能为空！'
      }
    )
    const data: AddProject = {
      id,
      name: name.trim()
    }
    await projectInfo.reviseProjectName(data)
  } catch (error) {
    //@ts-ignore
    ElMessage({
      type: 'info',
      message: '取消输入'
    })
  }
}
// 选择项目
const chooseProject = (id: number) => {
  projectInfo.theCurrentProject = id
}
</script>
<style scoped>
.aa {
  width: 830px;
}
.scrollbar-flex-content {
  height: 30px;
  overflow: hidden;
  margin-right: 30px;
  padding: 2px 10px;
  font-size: 10px;
  border-radius: 4px;
  border: solid 1px var(--el-border-color);
  background-color: #fafafa;
}
.header {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
}
.title {
  padding: 18px 20px;
  padding-left: 0;
  font-weight: 600;
  font-size: 16px;
}
.script {
  display: flex;
  align-items: center;
}
.scriptText {
  height: 24px;
  overflow: hidden;
  margin-right: 30px;
  padding: 2px 10px;
  font-size: 10px;
  border-radius: 4px;
  border: solid 1px var(--el-border-color);
  background-color: #fafafa;
}
.scriptText span {
  width: 200px;
}
.table {
  border: solid 1px var(--el-border-color);
}
</style>
