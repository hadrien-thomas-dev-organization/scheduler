<script setup lang="ts">
import Calendar from './components/Calendar.vue';
import packageJson from '../package.json'; // Ajustez le chemin selon votre structure
const appVersion = packageJson.version;

</script>

<template>
  <Calendar />
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>Scheduler</strong> version {{ appVersion }}
      </p>
    </div>
  </footer>
</template>