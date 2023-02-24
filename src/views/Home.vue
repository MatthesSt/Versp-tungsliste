<template>
  <div class="bg-dark d-flex flex-column justify-content-center align-items-center px-2" style="height: 92vh">
    <div class="card w-md-25 w-100">
      <div class="card-header">
        <div>Preis pro Stunde: {{ Math.floor(strikes / 3) }}</div>
        <div>Striche: {{ strikes % 3 }}</div>
        <div></div>
      </div>
      <div class="card-body p-4">
        <TimeInput placeholder="Ankunftszeit" v-model="time" :auto-fill="true"></TimeInput>
        <DateInput class="mb-2" placeholder="Tag" v-model="date" :auto-fill="true"></DateInput>
        <Message v-model:success="success" v-model:error="error"></Message>
        {{ date }}
      </div>
      <div class="card-footer d-flex justify-content-end">
        <Button class="btn btn-secondary" @click.stop="submit()" :disabled="!!(events || []).find(e => e.start.split(' ')[0] == date)">
          speichern
        </Button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import * as API from '../API';
import { TimeInput, DateInput, Button, Message } from 'custom-mbd-components';
import { ref } from 'vue';

const time = ref('');
const date = ref('');
const success = ref('');
const error = ref('');
const strikes = ref(0);
const miracles = ref(0);
const priceToPay = ref(0);

const events = ref<{ start: string; priceToPay: number; id: string }[]>();

async function init() {
  events.value = (await API.getEntries()) as unknown as { start: string; priceToPay: number; id: string }[];
  const stats = await API.getStats();
  if (stats) {
    strikes.value = stats.strikes;
    miracles.value = stats.miracles;
  }
}
init();

function strike(hours: number = 9) {
  strikes.value++;
  miracles.value = 0;
  priceToPay.value = Math.floor(strikes.value / 3) * (+hours - 9 + 1);
}

async function submit() {
  let [hours, minutes] = time.value.split(':');
  let [year, month, day] = date.value.split('-');
  if (+hours - 9 > 0) {
    strike(+hours);
  }
  if (+hours - 9 === 0) {
    if (+year == 2023 && +month < 3 && minutes > '30') strike();
    if (+year == 2023 && +month == 3 && minutes > '25') strike();
    if (+year == 2023 && +month == 4 && minutes > '15') strike();
    if (+month > 4 && minutes > '05') strike();
  }
  if (+hours == 9 && +minutes) {
    miracles.value = 0;
  }
  if (+hours - 9 < 0 || (+hours - 9 === 0 && +minutes === 0)) {
    miracles.value++;
    if (miracles.value === 3) {
      strikes.value > 3 ? (strikes.value -= 3) : (strikes.value = 0);
      miracles.value = 0;
    }
  }
  try {
    await API.createEntry(time.value, date.value, priceToPay.value);
    await API.updateStats(strikes.value, miracles.value);
    success.value = priceToPay.value ? `zu zahlen: ${priceToPay.value}` : 'Erfolgreich gespeichert';
  } catch (e) {
    console.error(e);
    error.value = 'Fehler beim Speichern';
  } finally {
    priceToPay.value = 0;
  }
}
</script>
