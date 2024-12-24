<script setup lang="ts">
import { DayPilotMonth } from '@daypilot/daypilot-lite-vue';
import { format } from 'date-fns';
import { ref } from 'vue';

const startDate = ref(format(new Date(), 'yyyy-MM-dd'));

</script>

<template>
    <h1>Calendar for this month</h1>
    <DayPilotMonth :startDate="startDate" />
</template>