<template>
  <div class="bg-dark text-light" style="height: 92vh">
    <div class="row g-0">
      <div class="col-lg-2 offset-lg-4 col-6">Aktueller Preis pro Stunde:</div>
      <div class="col-6">{{ Math.floor(strikes / 3) }}€</div>
      <div class="col-lg-2 offset-lg-4 col-6">Anzahl Striche:</div>
      <div class="col-6">{{ strikes % 3 }}</div>
      <div class="col-lg-2 offset-lg-4 col-6">Anzahl Miracles:</div>
      <div class="col-6">{{ miracles }}</div>
      <div class="col-lg-2 offset-lg-4 col-6">durschnittliche Zeit:</div>
      <div class="col-6">{{ Math.floor(avgTime / 60) }}:{{ Math.round(avgTime) % 60 }}</div>
      <div class="col-lg-2 offset-lg-4 col-6">Späteste Zeit:</div>
      <div class="col-6">{{ events?.map(e => e.start.split(' ')[1]).sort((a, b) => (a < b ? 1 : -1))[0] }}</div>
      <div class="col-lg-2 offset-lg-4 col-6">Früheste Zeit:</div>
      <div class="col-6">{{ events?.map(e => e.start.split(' ')[1]).sort((a, b) => (a < b ? -1 : 1))[0] }}</div>
      <div class="col-lg-2 offset-lg-4 col-6">Gesamter Schadensersatz:</div>
      <div class="col-6">{{ events?.map(e => e.priceToPay || 0).reduce((a, b) => a + b, 0) }}€</div>
      <div class="col-lg-2 offset-lg-4 col-6">Durschnittlicher Schadensersatz:</div>
      <div class="col-6">{{ ((events?.map(e => e.priceToPay || 0).reduce((a, b) => a + b, 0) || 0) / (events?.length || 1)).toFixed(2) }}€</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import * as API from '../API';

const events = ref<{ start: string; priceToPay: number; id: string }[]>();
const strikes = ref(0);
const miracles = ref(0);

const avgTime = computed(() => {
  if (events.value) {
    return (
      events.value?.map(e => +e.start.split(' ')[1].split(':')[0] * 60 + +e.start.split(' ')[1].split(':')[1]).reduce((a, b) => a + b) /
      events.value.length
    );
  }
  return 0;
});

async function init() {
  const stats = await API.getStats();
  events.value = (await API.getEntries()) as unknown as { start: string; priceToPay: number; id: string }[];
  console.log(events.value);
  if (stats) {
    strikes.value = stats.strikes;
    miracles.value = stats.miracles;
  }
}
init();
</script>
<style lang="scss" scoped></style>
