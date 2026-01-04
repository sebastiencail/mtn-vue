<template>
  <v-btn text="Ajouter un tarif"></v-btn>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { deleteTherapeute, getTherapeutes } from '@/api/therapeutes.api'
import type { components } from '../../api/generated'
import { getTarifs } from '@/api/tarifs.api'

type ReadTarifDto = components['schemas']['ReadTarifDto']

const tarifs = ref<ReadTarifDto[]>([])

onMounted(async () => {
  fetchTarifs()
})

const fetchTarifs = async () => {
  try {
    tarifs.value = await getTarifs()
  } catch (e) {
    console.error(e)
  }
}
</script>
