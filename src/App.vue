<template>
  <div style="height: 8vh">
    <Navbar />
  </div>
  <div class="w-100" style="min-height: 92vh; max-height: 92vh">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import Navbar from './components/Navbar.vue';
</script>
<style lang="scss"></style>
