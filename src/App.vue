<template>
  <Navbar />
 <div class="bg-dark d-flex flex-1 w-100" style="min-height: 100vh">
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import Navbar from './components/Navbar.vue';
</script>
<style lang="scss" ></style>