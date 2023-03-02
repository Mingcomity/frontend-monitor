<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>SDK 使用方法</span>
          <el-button type="danger" @click="open">退出登录</el-button>
        </div>
      </template>
      <div>
        <p>
          1.点击下方项目列表中的复制按钮 ，将复制包含该项目 SDK Key 的 script
          标签。
        </p>
        <el-divider />
        <p>2.将 script 标签添加到你的页面中即可。</p>
        <el-divider content-position="left"
          >建议将 SDK 作为第一个 script 标签</el-divider
        >
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const router = useRouter()
const open = () => {
  //@ts-ignore
  ElMessageBox.confirm('真的要退出吗?', '退出登录', {
    confirmButtonText: '是的',
    cancelButtonText: '我再想想',
    type: 'warning'
  })
    .then(() => {
      Cookies.remove('token')
      router.push('/login')
      //@ts-ignore
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
    })
    .catch(() => {
      //@ts-ignore
      ElMessage({
        type: 'info',
        message: '好的'
      })
    })
}
</script>
<style scoped>
.box-card {
  box-shadow: none;
  border: none;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
:deep(.el-card__header) {
  border: none;
  font-weight: 600;
  padding-left: 0;
  padding-right: 0;
  margin-top: 20px;
}
:deep(.el-card__body) {
  border: solid 1px var(--el-border-color);
  font-size: 14px;
}
:deep(.el-divider__text) {
  color: #909090;
  font-size: 10px;
}
</style>
