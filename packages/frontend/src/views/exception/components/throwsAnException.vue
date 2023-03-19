<template>
  <div>
    <el-button @click="throwJsErr()">抛出JS异常</el-button>
    <el-button @click="Resource()">抛出Resource异常</el-button>
    <el-button @click="Fetch_Exception()">抛出Fetch异常</el-button>
    <el-button @click="Promise_Exception()">抛出Promise异常</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const throwJsErr = () => {
  //@ts-ignore
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `测试：抛出JS异常`
  })
  throw new EvalError('111')
}
const Resource = () => {
  const imgSrc = ` https://mdimages-1314620922.cos.ap-guangzhou.myqcloud.com/Maekdownimages%2Fzijie-6%2Fpexels-elijah-o'donnell-3473569.webp`
  //@ts-ignore
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `测试：抛出Resource异常 <img src=${imgSrc}>`
  })
}
const Fetch_Exception = async () => {
  await fetch('https://api.github.com/users/chriscoyier/erepos').then()
  //@ts-ignore
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `测试：抛出Fetch异常`
  })
}
const Promise_Exception = () => {
  //@ts-ignore
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: `测试：抛出Promise异常`
  })
  new Promise((resolve, reject) => {
    reject()
  }).then()
}
</script>
<style scoped></style>
