<template>
  <div>
    <UserDescription></UserDescription>
    <Sdk></Sdk>
    <ListOfItems></ListOfItems>
  </div>
</template>

<script setup lang="ts">
import UserDescription from './components/UserDescription.vue'
import Sdk from './components/Sdk.vue'
import ListOfItems from './components/ListOfItems.vue'
import { onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'
onMounted(() => {
  console.log('初始化')
})
onActivated(() => {
  console.log('keep-alive初始化')
})
onDeactivated(() => {
  console.log('keep-alive卸载')
})
onUnmounted(() => {
  console.log('卸载')
})
</script>
<style scoped></style>
