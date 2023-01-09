<template>
<div><button @click="API.logout()">logout</button></div>

</template>
<script lang="ts" setup>
import * as API from '../API';
</script>