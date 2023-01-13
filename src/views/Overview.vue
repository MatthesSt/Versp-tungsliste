<template>
  <div class="bg-light" style="height: 92vh">
    <Calendar :display-hours="[0, 24]" :groups="groups" :events="mappedEvents" @event-clicked="e => (selectedEvent = e)"></Calendar>
  </div>
  <Modal v-model="showModal">
    <div>angekommen um: {{ selectedEvent?.start?.length > 5 ? selectedEvent?.start.slice(11, 16) : selectedEvent?.start }}</div>
    <div>
      <Button @click="update">{{ edit ? 'speichern' : 'bearbeiten' }}</Button>
    </div>
    <div v-if="edit">
      <TimeInput placeholder="Ankunftszeit" v-model="time"></TimeInput>
      <DateInput class="mb-2" placeholder="Tag" v-model="date"></DateInput>
    </div>
    <template #button><div class="d-none"></div></template>
  </Modal>
</template>
<script lang="ts" setup>
import { Calendar, CalendarEvent, CalendarGroup, Modal, Button, TimeInput, DateInput } from 'custom-mbd-components';
import { computed, ref } from 'vue';
import * as API from '../API';

const events = ref<CalendarEvent[]>([]);
const selectedEvent = ref<CalendarEvent>();
const edit = ref(false);
const time = ref('');
const date = ref('');
async function update() {
  if (edit.value && !!selectedEvent.value) {
    selectedEvent.value.start = `${date.value} ${time.value}`;
    await API.updateEntry(selectedEvent.value?.id, selectedEvent.value);
    edit.value = false;
  } else {
    if (!!selectedEvent.value) {
      time.value = selectedEvent.value.start.slice(11, 16);
      date.value = selectedEvent.value.start.slice(0, 10);
    } else {
      time.value = '';
      date.value = '';
    }
    edit.value = true;
  }
}
const showModal = computed({
  get() {
    return !!selectedEvent.value;
  },
  set(newValue: boolean) {
    if (!newValue) selectedEvent.value = undefined;
  },
});
const groups = ref<CalendarGroup[]>([
  {
    name: 'pünktlich',
    id: 1,
    checked: true,
    color: 'green',
  },
  {
    name: 'kritisch',
    id: 2,
    checked: true,
    color: 'orange',
  },
  {
    name: 'zu spät',
    id: 3,
    checked: true,
    color: 'red',
  },
]);
const mappedEvents = computed(() =>
  events.value.map((e: any) => ({ id: e.id, start: e.start, name: 'ankunft', end: getEndTime(e.start), group_id: getGroup(e) }))
);
async function getEntries() {
  try {
    events.value = await API.getEntries();
  } catch (e) {
    console.error(e);
  }
}
getEntries();

function getGroup(e: any) {
  const start = e.start;
  const date = start.split(' ')[0];
  const time = start.split(' ')[1];
  const hours = time.split(':')[0];
  const minutes = time.split(':')[1];
  if (hours < '09') return 1;
  if (hours < '10' && minutes < '30') return 2;
  return 3;
}

function getEndTime(start: string) {
  const date = start.split(' ')[0];
  const time = start.split(' ')[1];
  const hours = time.split(':')[0];
  const minutes = time.split(':')[1];
  return `${date} ${hours}:${+minutes + 15}:00`;
}
</script>
