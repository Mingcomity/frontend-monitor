<template>
  <div class="main">
    <PerCard></PerCard>
    <div class="card">
      <Carousel class="carousel"></Carousel>
      <ListVue class="list"></ListVue>
    </div>
  </div>
</template>

<script setup lang="ts">
import PerCard from './components/PerCard.vue'
import Carousel from './components/Carousel.vue'
import ListVue from './components/List.vue'
</script>
<style scoped>
.card {
  display: flex;
  margin-top: 2rem;
}
.carousel {
  width: 60%;
  margin-right: 2rem;
}
.list {
  width: 40%;
}
</style>
