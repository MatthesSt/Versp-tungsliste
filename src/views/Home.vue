<template>
  <div class="bg-dark d-flex flex-column justify-content-center align-items-center" style="height: 92vh">
    <div class="card w-25">
      <div class="card-body p-4">
        <TimeInput placeholder="Ankunftszeit" v-model="time"></TimeInput>
        <DateInput class="mb-2" placeholder="Tag" v-model="date"></DateInput>
        <Message v-model:success="success" v-model:error="error"></Message>
      </div>
      <div class="card-footer d-flex justify-content-end">
        <Button class="btn btn-secondary" @click.stop="submit()">speichern</Button>
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

async function submit() {
  try {
    await API.createEntry(time.value, date.value);
    success.value = 'Erfolgreich gespeichert';
  } catch (e) {
    console.error(e);
    error.value = 'Fehler beim Speichern';
  }
}
</script>
