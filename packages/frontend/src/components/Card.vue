<template>
  <el-col :span="8">
    <el-card :header="title" shadow="hover"><slot></slot></el-card>
  </el-col>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
  }>(),
  {
    title: ' '
  }
)
</script>
<style scoped>
:deep(.el-card__header) {
  font-size: 1rem;
  padding-bottom: 0;
  border: none;
}
:deep(.el-card__body) {
  padding-top: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
}
</style>
