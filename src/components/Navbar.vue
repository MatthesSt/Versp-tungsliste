<template>
  <nav class="bg-dark text-light d-flex justify-content-between align-items-center px-5" style="height: 8vh">
    <div class="">
      <router-link to="/" class="text-light me-2">Home</router-link>
      <router-link to="/stats" class="text-light me-2">Stats</router-link>
      <router-link to="/overview" class="text-light">Overview</router-link>
    </div>
    <Button class="btn btn-dark" @click="API.logout()">logout</Button>
  </nav>
</template>
<script lang="ts" setup>
import { Button } from 'custom-mbd-components';
import * as API from '../API';
import router from '../router';
</script>
