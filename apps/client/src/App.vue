<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
</script>

<template>
  <main class="min-h-screen min-w-screen bg-background p-4 flex flex-col gap-2">
    <Header />
    <div>
      <RouterView />
    </div>
  </main>
</template>
