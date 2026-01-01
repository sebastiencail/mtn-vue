<script setup lang="ts">
import AppMenuBar from './components/layout/AppMenuBar.vue'
</script>

<template>
  <v-app>
    <v-layout class="rounded rounded-md border">
      <v-app-bar title="Gestion des thérapeutes" color = deep-purple-darken-2></v-app-bar>

      <AppMenuBar />

      <v-main class="d-flex">
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>
