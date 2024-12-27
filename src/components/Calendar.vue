<template>
    <h1>Calendar for this month</h1>
    <DayPilotCalendar :config="calendarConfig" ref="calendarRef" />
    <button @click="exportCalendar">Export iCalendar</button>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { DayPilot, DayPilotCalendar } from '@daypilot/daypilot-lite-vue';
import { exportToICalendar } from '../export-to-icalendar';

// Définition des événements
const events: DayPilot.EventData[] = [
    {
        id: 1,
        start: "2024-12-23T10:00:00",
        end: "2024-12-23T11:00:00",
        text: "Event 1",
    },
    {
        id: 2,
        start: "2024-12-25T14:00:00",
        end: "2024-12-25T16:00:00",
        text: "Event 2",
    },
];

// Configuration du calendrier
const calendarConfig = reactive({
    viewType: "Week",
    events,
    onTimeRangeSelected: async (args: { control: DayPilot.Calendar; start: DayPilot.Date; end: DayPilot.Date; }) => {
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event name");
        const dp = args.control;
        dp.clearSelection();
        if (modal.canceled) {
            return;
        }

        // Ajout de l'événement au calendrier
        const newEvent = {
            start: args.start,
            end: args.end,
            id: DayPilot.guid(),
            text: modal.result as string,
        };

        dp.events.list.push(newEvent); // Ajout de l'événement dans le calendrier
    },
});

// Référence du calendrier
const calendarRef = ref<InstanceType<typeof DayPilotCalendar> | null>(null);

// Fonction pour exporter les événements en iCalendar
const exportCalendar = () => {
    if (calendarRef.value) {
        // Accéder aux événements via `control.events.list`
        const events = calendarRef.value.control.events.list; // Assurez-vous d'utiliser `.list` si c'est nécessaire pour obtenir un tableau
        const icsContent = exportToICalendar(events);
        const blob = new Blob([icsContent], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "calendar.ics";
        a.click();

        URL.revokeObjectURL(url); // Nettoyer l'URL après utilisation
    }
};
</script>