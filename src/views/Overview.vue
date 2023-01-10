<template>
  <div class="bg-light" style="height: 92vh">
    {{ events }}
    <br />
    {{ mappedEvents }}
    <Calendar
      :display-hours="[0, 24]"
      :groups="[
        {
          name: 'test',
          id: 1,
          checked: true,
        },
      ]"
      :events="mappedEvents"
    ></Calendar>
  </div>
</template>
<script lang="ts" setup>
import { Calendar, CalendarEvent, CalendarGroup } from 'custom-mbd-components';
import { computed, ref } from 'vue';
import * as API from '../API';

const events = ref<CalendarEvent[]>([]);
const groups = ref<CalendarGroup[]>([]);
const mappedEvents = computed(() =>
  events.value.map((e: any) => ({ id: e.id, start: e.start, name: 'ankunft', end: getEndTime(e.start), group_id: 1 }))
);
async function getEntries() {
  try {
    events.value = await API.getEntries();
  } catch (e) {
    console.error(e);
  }
}
getEntries();

function getEndTime(start: string) {
  const date = start.split(' ')[0];
  const time = start.split(' ')[1];
  const hours = time.split(':')[0];
  const minutes = time.split(':')[1];
  return `${date} ${hours}:${+minutes + 15}:00`;
}
</script>
