<script setup lang="ts">
import { store } from "../store/main.ts";
</script>
<template>
  <div class="flex flex-col h-screen">
    <header class="flex items-center justify-between p-4 fixed w-full bg-white">
      <h1 class="text-3xl font-bold">Vue Playground</h1>
      <nav class="flex gap-4">
        <a href="#" class="text-blue-500">Home</a>
        <a href="#" class="text-blue-500">About</a>
        <a href="#" class="text-blue-500">{{ store.count }}</a>
        <a href="#" class="text-blue-500">{{ store.query }}</a>
      </nav>
    </header>
    <main class="flex-1 p-4">
      <slot></slot>
    </main>
  </div>
</template>
